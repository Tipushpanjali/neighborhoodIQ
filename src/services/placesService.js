
import { calculateDistanceKm } from '../utils/distance';

const OVERPASS_ENDPOINTS = [
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter'
];

const memoryCache = new Map();
const REQUEST_TIMEOUT = 20000;

const getCoordinates = (element) => {
  const lat = element.lat ?? element.center?.lat;
  const lon = element.lon ?? element.center?.lon;

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  return { lat, lon };
};

const getName = (tags = {}) =>
  tags.name || tags['name:en'] || tags.brand || 'Unnamed mapped place';

const emptyResult = (latitude, longitude, radius, status, errorMessage = '') => ({
  schools: [],
  hospitals: [],
  transit: [],
  roads: [],
  otherPlaces: [],
  isLive: false,
  status,
  errorMessage,
  source: 'OpenStreetMap',
  fetchedAt: new Date().toISOString(),
  searchedLocation: {
    lat: latitude,
    lon: longitude,
    radiusKm: radius
  }
});

export async function fetchNearbyPlaces(lat, lon, radiusKm = 2) {
  const latitude = Number(lat);
  const longitude = Number(lon);
  const radius = Number(radiusKm);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    !Number.isFinite(radius) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180 ||
    radius <= 0
  ) {
    throw new Error('Invalid location coordinates or search radius.');
  }

  const cacheKey = `${latitude.toFixed(5)}_${longitude.toFixed(5)}_${radius}`;

  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const radiusMeters = Math.round(radius * 1000);

  const query = `
    [out:json][timeout:25];
    (
      nwr["amenity"~"^(school|kindergarten|university|college)$"]
        (around:${radiusMeters},${latitude},${longitude});

      nwr["amenity"~"^(hospital|clinic|doctors|dentist|pharmacy)$"]
        (around:${radiusMeters},${latitude},${longitude});

      nwr["railway"~"^(station|halt)$"]
        (around:${radiusMeters},${latitude},${longitude});

      nwr["highway"="bus_stop"]
        (around:${radiusMeters},${latitude},${longitude});

      way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|service)$"]
        (around:${radiusMeters},${latitude},${longitude});
    );
    out center tags;
  `;

  let data = null;
  let successfulEndpoint = null;
  const errors = [];

  // Try alternative Overpass servers if one is unavailable.
  for (const endpoint of OVERPASS_ENDPOINTS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT
    );

    try {
      console.info(`Trying OpenStreetMap server: ${endpoint}`);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        },
        body: `data=${encodeURIComponent(query)}`,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const responseData = await response.json();

      if (!Array.isArray(responseData.elements)) {
        throw new Error('Invalid OpenStreetMap response.');
      }

      data = responseData;
      successfulEndpoint = endpoint;

      console.info(`OpenStreetMap connected: ${endpoint}`);
      break;

    } catch (error) {
      const message = error.name === 'AbortError'
        ? 'Request timed out'
        : error.message;

      errors.push(`${endpoint}: ${message}`);

      console.warn(`Overpass server failed: ${message}`);

    } finally {
      clearTimeout(timeoutId);
    }
  }

  if (!data) {
    const result = emptyResult(
      latitude,
      longitude,
      radius,
      'error',
      `All OpenStreetMap servers failed. ${errors.join(' | ')}`
    );

    console.error(result.errorMessage);
    return result;
  }

  const schools = [];
  const hospitals = [];
  const transit = [];
  const roads = [];
  const otherPlaces = [];

  data.elements.forEach((element) => {
    const coordinates = getCoordinates(element);
    if (!coordinates) return;

    const distanceKm = calculateDistanceKm(
      latitude,
      longitude,
      coordinates.lat,
      coordinates.lon
    );

    if (distanceKm > radius) return;

    const tags = element.tags || {};

    const item = {
      id: `osm-${element.type}-${element.id}`,
      name: getName(tags),
      lat: coordinates.lat,
      lon: coordinates.lon,
      distanceKm: Number(distanceKm.toFixed(2)),
      source: 'OpenStreetMap',
      osmType: element.type,
      osmId: element.id,
      osmUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
      tags
    };

    if (
      ['school', 'kindergarten', 'university', 'college'].includes(tags.amenity)
    ) {
      schools.push({
        ...item,
        type: tags.amenity,
        operator: tags.operator || null
      });

    } else if (
      ['hospital', 'clinic', 'doctors', 'dentist', 'pharmacy'].includes(tags.amenity)
    ) {
      hospitals.push({
        ...item,
        type: tags.amenity,
        emergency24x7: tags.emergency === '24/7'
      });

    } else if (
      tags.railway === 'station' ||
      tags.railway === 'halt' ||
      tags.highway === 'bus_stop'
    ) {
      transit.push({
        ...item,
        type: tags.highway === 'bus_stop'
          ? 'Bus Stop'
          : 'Railway Station'
      });

    } else if (tags.highway) {
      roads.push({
        ...item,
        type: tags.highway
      });

    } else {
      otherPlaces.push(item);
    }
  });

  const sortByDistance = (items) =>
    items.sort((a, b) => a.distanceKm - b.distanceKm);

  const totalFeatures =
    schools.length +
    hospitals.length +
    transit.length +
    roads.length +
    otherPlaces.length;

  const result = {
    schools: sortByDistance(schools),
    hospitals: sortByDistance(hospitals),
    transit: sortByDistance(transit),
    roads: sortByDistance(roads),
    otherPlaces: sortByDistance(otherPlaces),

    isLive: true,
    status: totalFeatures > 0 ? 'live' : 'empty',

    source: 'OpenStreetMap',
    endpoint: successfulEndpoint,
    fetchedAt: new Date().toISOString(),

    searchedLocation: {
      lat: latitude,
      lon: longitude,
      radiusKm: radius
    }
  };

  // Cache only successful server responses.
  memoryCache.set(cacheKey, result);

  return result;
}

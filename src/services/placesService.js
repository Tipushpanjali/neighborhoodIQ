import { calculateDistanceKm, filterAndSortByDistance } from '../utils/distance';
import { DEMO_NEIGHBORHOODS } from '../data/demoNeighborhoods';

const OVERPASS_URL = import.meta.env.VITE_OVERPASS_API_URL || 'https://overpass-api.de/api/interpreter';

// In-memory cache for session queries
const memoryCache = new Map();

/**
 * Fetch nearby places for schools, healthcare, and transit around coordinates within radiusKm
 */
export async function fetchNearbyPlaces(lat, lon, radiusKm = 2.0) {
  const cacheKey = `${lat.toFixed(3)}_${lon.toFixed(3)}_${radiusKm}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  const radiusMeters = Math.round(radiusKm * 1000);

  // Try live Overpass query if network is available
  try {
    const query = `
      [out:json][timeout:10];
      (
        node["amenity"="school"](around:${radiusMeters},${lat},${lon});
        node["amenity"="hospital"](around:${radiusMeters},${lat},${lon});
        node["amenity"="clinic"](around:${radiusMeters},${lat},${lon});
        node["railway"="station"](around:${radiusMeters},${lat},${lon});
        node["highway"="bus_stop"](around:${radiusMeters},${lat},${lon});
      );
      out body 30;
    `;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(OVERPASS_URL, {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.elements) && data.elements.length > 0) {
        const schools = [];
        const hospitals = [];
        const transit = [];

        data.elements.forEach(el => {
          const name = el.tags?.name || el.tags?.['name:en'] || 'Unnamed Facility';
          const distance = calculateDistanceKm(lat, lon, el.lat, el.lon);
          const item = {
            id: `osm-${el.id}`,
            name,
            lat: el.lat,
            lon: el.lon,
            distanceKm: distance,
            source: 'OpenStreetMap (OSM)',
            verifiedDate: '2026-10-25'
          };

          if (el.tags?.amenity === 'school') {
            schools.push({ ...item, type: el.tags?.operator_type || 'School', board: 'Recognized' });
          } else if (el.tags?.amenity === 'hospital' || el.tags?.amenity === 'clinic') {
            hospitals.push({ ...item, type: el.tags?.amenity === 'hospital' ? 'Hospital' : 'Clinic', emergency24x7: el.tags?.emergency === 'yes' });
          } else if (el.tags?.railway === 'station' || el.tags?.highway === 'bus_stop') {
            transit.push({ ...item, type: el.tags?.railway === 'station' ? 'Metro / Rail' : 'Bus Stop' });
          }
        });

        const result = {
          schools: schools.sort((a, b) => a.distanceKm - b.distanceKm),
          hospitals: hospitals.sort((a, b) => a.distanceKm - b.distanceKm),
          transit: transit.sort((a, b) => a.distanceKm - b.distanceKm),
          isLive: true
        };

        memoryCache.set(cacheKey, result);
        return result;
      }
    }
  } catch (err) {
    console.warn('Overpass API query failed or timed out; falling back to curated neighborhood dataset:', err.message);
  }

  // Fallback to nearest curated demo neighborhood
  const nearest = findNearestCuratedNeighborhood(lat, lon);
  const result = {
    schools: filterAndSortByDistance(nearest.schools, lat, lon, radiusKm),
    hospitals: filterAndSortByDistance(nearest.hospitals, lat, lon, radiusKm),
    transit: [
      ...nearest.publicTransport.metroStations.map(m => ({ ...m, type: 'Metro Station', isMetro: true })),
      ...nearest.publicTransport.busStops.map(b => ({ ...b, type: 'Bus Stop', isBus: true }))
    ].map(item => ({
      ...item,
      distanceKm: item.distanceKm || calculateDistanceKm(lat, lon, nearest.lat, nearest.lon) + 0.3
    })).filter(item => item.distanceKm <= radiusKm),
    isLive: false,
    curatedFrom: nearest.name
  };

  memoryCache.set(cacheKey, result);
  return result;
}

function findNearestCuratedNeighborhood(lat, lon) {
  let best = DEMO_NEIGHBORHOODS[0];
  let minD = Infinity;
  for (const n of DEMO_NEIGHBORHOODS) {
    const d = calculateDistanceKm(lat, lon, n.lat, n.lon);
    if (d < minD) {
      minD = d;
      best = n;
    }
  }
  return best;
}

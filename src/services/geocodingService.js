import { DEMO_NEIGHBORHOODS } from '../data/demoNeighborhoods';

const NOMINATIM_BASE = import.meta.env.VITE_NOMINATIM_BASE_URL || 'https://nominatim.openstreetmap.org';

// Approximate Delhi NCR Bounding Box: minLon, minLat, maxLon, maxLat
const DELHI_NCR_VIEWBOX = '76.80,28.20,77.70,28.95';

/**
 * Searches locations using OpenStreetMap Nominatim with rate-limit respect and fallback
 * @param {string} query User entered address or locality
 * @returns {Promise<Array>} List of standardized location objects
 */
export async function searchAddress(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const cleanQuery = query.trim().toLowerCase();

  // Try live Nominatim API if online
  try {
    const params = new URLSearchParams({
      q: cleanQuery,
      format: 'json',
      addressdetails: '1',
      limit: '6',
      countrycodes: 'in',
      viewbox: DELHI_NCR_VIEWBOX,
      bounded: '1'
    });

    const response = await fetch(`${NOMINATIM_BASE}/search?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NeighborhoodIQ-DelhiNCR-HomebuyerApp/1.0'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(item => ({
          id: item.place_id ? String(item.place_id) : `loc-${item.lat}-${item.lon}`,
          name: item.display_name.split(',')[0],
          displayName: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          type: item.type || 'locality',
          isLive: true
        }));
      }
    }
  } catch (err) {
    console.warn('Live Nominatim request failed or rate-limited; falling back to curated Delhi NCR locations:', err.message);
  }

  // Graceful fallback: Filter from curated Delhi NCR locations
  return DEMO_NEIGHBORHOODS.filter(n =>
    n.name.toLowerCase().includes(cleanQuery) ||
    n.locality.toLowerCase().includes(cleanQuery) ||
    n.city.toLowerCase().includes(cleanQuery) ||
    (n.pinCode && n.pinCode.includes(cleanQuery))
  ).map(n => ({
    id: n.id,
    name: n.name,
    displayName: `${n.locality}, ${n.city}, ${n.state} - ${n.pinCode}`,
    lat: n.lat,
    lon: n.lon,
    type: 'curated_locality',
    isLive: false
  }));
}

/**
 * Reverse geocodes a latitude and longitude into a friendly address name
 */
export async function reverseGeocode(lat, lon) {
  try {
    const response = await fetch(`${NOMINATIM_BASE}/reverse?lat=${lat}&lon=${lon}&format=json`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NeighborhoodIQ-DelhiNCR-HomebuyerApp/1.0'
      }
    });
    if (response.ok) {
      const data = await response.json();
      return {
        displayName: data.display_name,
        name: data.display_name.split(',')[0],
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        isLive: true
      };
    }
  } catch (err) {
    console.warn('Reverse geocode failed; generating coordinate label:', err.message);
  }

  return {
    displayName: `Selected Point (${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E), Delhi NCR`,
    name: `Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
    lat: parseFloat(lat),
    lon: parseFloat(lon),
    isLive: false
  };
}

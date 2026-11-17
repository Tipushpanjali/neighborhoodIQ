
import { DEMO_NEIGHBORHOODS } from '../data/demoNeighborhoods';

const NOMINATIM_BASE =
  import.meta.env.VITE_NOMINATIM_BASE_URL ||
  'https://nominatim.openstreetmap.org';

// Delhi NCR bounding box: minLon, minLat, maxLon, maxLat
// Used to prioritize Delhi NCR results, not restrict them.
const DELHI_NCR_VIEWBOX = '76.80,28.95,77.70,28.20';

/**
 * Searches locations using OpenStreetMap Nominatim.
 * Delhi NCR results are prioritized, with curated locality fallback.
 *
 * @param {string} query User-entered address or locality
 * @returns {Promise<Array>} Standardized location objects
 */
export async function searchAddress(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchQuery = query.trim();
  const cleanQuery = searchQuery.toLowerCase();

  // Try live Nominatim API
  try {
    const params = new URLSearchParams({
      q: searchQuery,
      format: 'json',
      addressdetails: '1',
      limit: '6',
      countrycodes: 'in',
      viewbox: DELHI_NCR_VIEWBOX
    });

    const response = await fetch(
      `${NOMINATIM_BASE}/search?${params.toString()}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        return data.map(item => {
          const displayName =
            item.display_name || item.name || 'Unknown location';

          return {
            id: item.place_id
              ? String(item.place_id)
              : `loc-${item.lat}-${item.lon}`,

            name: displayName.split(',')[0].trim(),
            displayName,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            type: item.type || 'locality',
            isLive: true
          };
        });
      }
    }
  } catch (err) {
    console.warn(
      'Live Nominatim search failed; using curated Delhi NCR locations:',
      err.message
    );
  }

  // Fallback: Search curated Delhi NCR locations
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
 * Reverse geocodes coordinates into a friendly address.
 */
export async function reverseGeocode(lat, lon) {
  try {
    const params = new URLSearchParams({
      lat: String(lat),
      lon: String(lon),
      format: 'json'
    });

    const response = await fetch(
      `${NOMINATIM_BASE}/reverse?${params.toString()}`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.display_name) {
        return {
          displayName: data.display_name,
          name: data.display_name.split(',')[0].trim(),
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          isLive: true
        };
      }
    }
  } catch (err) {
    console.warn(
      'Reverse geocode failed; generating coordinate label:',
      err.message
    );
  }

  return {
    displayName: `Selected Point (${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E), Delhi NCR`,
    name: `Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
    lat: parseFloat(lat),
    lon: parseFloat(lon),
    isLive: false
  };
}

/**
 * Calculate great-circle distance between two coordinates using the Haversine formula.
 * @param {number} lat1 Latitude of first point
 * @param {number} lon1 Longitude of first point
 * @param {number} lat2 Latitude of second point
 * @param {number} lon2 Longitude of second point
 * @returns {number} Distance in kilometers
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance in a human readable format (m or km)
 * @param {number} km Distance in kilometers
 * @returns {string} e.g. "450 m" or "2.3 km"
 */
export function formatDistance(km) {
  if (km === null || km === undefined || isNaN(km)) return 'N/A';
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return `${meters} m`;
  }
  return `${km.toFixed(1)} km`;
}

/**
 * Filter items by radius from center point
 * @param {Array} items List of items with lat/lon or latitude/longitude
 * @param {number} centerLat Center latitude
 * @param {number} centerLon Center longitude
 * @param {number} radiusKm Maximum radius in kilometers
 * @returns {Array} Filtered and distance-annotated items sorted by nearest first
 */
export function filterAndSortByDistance(items, centerLat, centerLon, radiusKm) {
  if (!items || !Array.isArray(items)) return [];
  return items
    .map(item => {
      const lat = item.lat || item.latitude;
      const lon = item.lon || item.longitude;
      const distance = calculateDistanceKm(centerLat, centerLon, lat, lon);
      return { ...item, distanceKm: distance };
    })
    .filter(item => item.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

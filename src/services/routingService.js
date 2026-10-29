import { calculateDistanceKm } from '../utils/distance';

const OSRM_URL = import.meta.env.VITE_OSRM_ROUTING_URL || 'https://router.project-osrm.org';

export const MAJOR_NCR_HUBS = [
  { id: 'cp', name: 'Connaught Place (Central Delhi)', lat: 28.6315, lon: 77.2167, hubType: 'Commercial / Govt' },
  { id: 'cybercity', name: 'Cyber Hub / Cyber City (Gurugram)', lat: 28.4950, lon: 77.0890, hubType: 'IT & Finance' },
  { id: 'noida62', name: 'Sector 62 IT Corridor (Noida)', lat: 28.6279, lon: 77.3649, hubType: 'Tech & Media' },
  { id: 'nehruplace', name: 'Nehru Place Financial Center (South Delhi)', lat: 28.5494, lon: 77.2520, hubType: 'Electronics & Corporate' },
  { id: 'aerocity', name: 'Delhi Aerocity (Hospitality & Offices)', lat: 28.5505, lon: 77.1215, hubType: 'Aviation & Corporate' }
];

/**
 * Calculates estimated driving commute route and travel time between origin and destination
 */
export async function calculateCommute(originLat, originLon, destLat, destLon) {
  const straightLineDistance = calculateDistanceKm(originLat, originLon, destLat, destLon);

  // Try live OSRM routing
  try {
    const url = `${OSRM_URL}/route/v1/driving/${originLon},${originLat};${destLon},${destLat}?overview=false`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distanceKm = parseFloat((route.distance / 1000).toFixed(1));
        const durationMin = Math.round(route.duration / 60);

        return {
          distanceKm,
          estimatedMinutes: durationMin,
          isLiveRouting: true,
          label: 'Calculated via OSRM Open Road Graph',
          conditions: 'Standard off-peak driving speed model; peak rush-hour transit typically adds 30-50% in Delhi NCR.'
        };
      }
    }
  } catch (err) {
    console.warn('OSRM routing request failed or offline; using Delhi NCR arterial road calibration:', err.message);
  }

  // Realistic fallback model: In Delhi NCR, road distance is typically 1.28x - 1.35x straight line distance
  const roadDistanceKm = parseFloat((straightLineDistance * 1.32).toFixed(1));
  // Average city driving speed ~25-32 km/h accounting for signals and junctions
  const estimatedMin = Math.max(8, Math.round((roadDistanceKm / 28) * 60));

  return {
    distanceKm: roadDistanceKm,
    estimatedMinutes: estimatedMin,
    isLiveRouting: false,
    label: 'Calibrated Arterial Road Model',
    conditions: 'Estimate based on typical arterial routes and traffic signal intervals. Peak congestion will vary.'
  };
}

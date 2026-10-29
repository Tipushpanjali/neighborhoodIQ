import { UTILITY_OBSERVATIONS } from '../data/ncrInfrastructure';

/**
 * Resolves the municipal administrative zone based on coordinates
 */
export function getUtilityObservations(lat, lon) {
  // Rough geographic partitions for Delhi NCR
  if (lon < 77.12 && lat < 28.52) {
    // South-West / Gurugram
    return UTILITY_OBSERVATIONS.gurugram;
  }
  if (lon > 77.33 && lat < 28.60) {
    // Noida
    return UTILITY_OBSERVATIONS.noida;
  }
  if (lon > 77.34 && lat >= 28.60) {
    // Ghaziabad / East
    return UTILITY_OBSERVATIONS.east_delhi_ghaziabad;
  }
  // Default to South / Central Delhi
  return UTILITY_OBSERVATIONS.south_delhi;
}

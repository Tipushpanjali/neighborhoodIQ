import { NCR_INFRASTRUCTURE_PROJECTS, ENVIRONMENTAL_INCIDENTS } from '../data/ncrInfrastructure';
import { calculateDistanceKm } from '../utils/distance';

export function getNearbyInfrastructureProjects(lat, lon, maxRadiusKm = 15.0) {
  return NCR_INFRASTRUCTURE_PROJECTS
    .map(proj => {
      const distance = calculateDistanceKm(lat, lon, proj.lat, proj.lon);
      return {
        ...proj,
        distanceKm: parseFloat(distance.toFixed(1))
      };
    })
    .filter(proj => proj.distanceKm <= (proj.impactRadiusKm || maxRadiusKm))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

export function getEnvironmentalIncidents(lat, lon) {
  // Returns verified hydrological and acoustic zoning assessments for Delhi NCR
  return ENVIRONMENTAL_INCIDENTS.map(inc => ({
    ...inc,
    relevance: 'Regional Delhi NCR Assessment'
  }));
}

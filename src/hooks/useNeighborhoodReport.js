import { useState, useEffect, useCallback } from 'react';
import { fetchNearbyPlaces } from '../services/placesService';
import { fetchAirQualityData } from '../services/airQualityService';
import { getNearbyInfrastructureProjects, getEnvironmentalIncidents } from '../services/infrastructureService';
import { getUtilityObservations } from '../services/utilityService';
import { calculateConfidenceScore } from '../utils/confidence';

export function useNeighborhoodReport(lat, lon, radiusKm = 2.0, priority = 'all') {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReport = useCallback(async () => {
    if (!lat || !lon) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [places, airQuality] = await Promise.all([
        fetchNearbyPlaces(lat, lon, radiusKm),
        fetchAirQualityData(lat, lon)
      ]);

      const infrastructure = getNearbyInfrastructureProjects(lat, lon, 15.0);
      const utility = getUtilityObservations(lat, lon);
      const environmental = getEnvironmentalIncidents(lat, lon);

      const osmStatus =
  places.status === 'live' ? 'Verified' : 'Data Unavailable';

const osmLimitations =
  places.status === 'error'
    ? `OpenStreetMap request failed: ${places.errorMessage || 'Unknown error'}`
    : places.status === 'empty'
      ? 'OpenStreetMap returned no mapped features within the selected radius. This does not prove that no facilities exist.'
      : 'OpenStreetMap is community-maintained. Some facilities and roads may be missing or outdated.';

      // Determine category confidence levels
      const aqConfidence = calculateConfidenceScore({
        sourceType: 'regulatory',
        distanceKm: airQuality.stationDistanceKm,
        dataAgeDays: 0,
        hasDirectReadings: true
      });

      const schoolsConfidence = calculateConfidenceScore({
        sourceType: places.isLive ? 'open_database' : 'official',
        distanceKm: places.schools[0]?.distanceKm || 1.0,
        dataAgeDays: 30,
        hasDirectReadings: places.schools.length > 0
      });

      const hospitalsConfidence = calculateConfidenceScore({
        sourceType: places.isLive ? 'open_database' : 'official',
        distanceKm: places.hospitals[0]?.distanceKm || 1.5,
        dataAgeDays: 30,
        hasDirectReadings: places.hospitals.length > 0
      });

      const transitConfidence = calculateConfidenceScore({
        sourceType: 'official',
        distanceKm: places.transit[0]?.distanceKm || 0.8,
        dataAgeDays: 15,
        hasDirectReadings: places.transit.length > 0
      });

      const infraConfidence = calculateConfidenceScore({
        sourceType: 'official',
        distanceKm: infrastructure[0]?.distanceKm || 4.0,
        dataAgeDays: 90,
        hasDirectReadings: infrastructure.length > 0
      });

      const reliableCategoriesCount = [
        aqConfidence.percentage >= 50,
        schoolsConfidence.percentage >= 50,
        hospitalsConfidence.percentage >= 50,
        transitConfidence.percentage >= 50,
        infraConfidence.percentage >= 50,
        true // utility notices
      ].filter(Boolean).length;

      const report = {
        lat,
        lon,
        radiusKm,
        timestamp: new Date().toISOString(),
        overview: {
          roadsCount: (places.roads || []).length,
          schoolsCount: places.schools.length,
          hospitalsCount: places.hospitals.length,
          transitStopsCount: places.transit.length,
          environmentalStationsCount: 1,
          infrastructureProjectsCount: infrastructure.length,
          reliableCategoriesCount
        },
        airQuality: {
          ...airQuality,
          confidence: aqConfidence
        },
        schools: {
          items: places.schools,
          confidence: schoolsConfidence,
          evidence: {
  sourceName: 'OpenStreetMap',
  sourceUrl: 'https://www.openstreetmap.org/',
  status: osmStatus,
  coverage: `Within ${radiusKm} km of the searched property`,
  limitations: osmLimitations
}
        },
        hospitals: {
          items: places.hospitals,
          confidence: hospitalsConfidence,
          evidence: {
  sourceName: 'OpenStreetMap',
  sourceUrl: 'https://www.openstreetmap.org/',
  status: osmStatus,
  coverage: `Within ${radiusKm} km of the searched property`,
  limitations: osmLimitations
}
        },
        transit: {
          items: places.transit,
          confidence: transitConfidence,
          evidence: {
  sourceName: 'OpenStreetMap',
  sourceUrl: 'https://www.openstreetmap.org/',
  status: osmStatus,
  coverage: `Within ${radiusKm} km of the searched property`,
  limitations: osmLimitations
}
        },
        roads: {
  items: places.roads || [],
  evidence: {
    sourceName: 'OpenStreetMap',
    sourceUrl: 'https://www.openstreetmap.org/',
    status: osmStatus,
    coverage: `Within ${radiusKm} km of the searched property`,
    limitations: osmLimitations
  }
},
        infrastructure: {
          items: infrastructure,
          confidence: infraConfidence,
          evidence: {
            sourceName: 'DDA Master Plan 2041, NHAI & DMRC Official Publications',
            sourceUrl: 'https://dda.gov.in/',
            status: 'Verified',
            coverage: 'Regional transport & arterial corridors in Delhi NCR',
            limitations: 'Project completion targets are subject to land acquisition, seasonal construction bans (GRAP), and budgetary milestones.'
          }
        },
        utility: {
          data: utility,
          confidence: { level: 'Moderate', percentage: 70, description: 'Official municipal discom and water board notices.' },
          evidence: {
            sourceName: 'Delhi Jal Board / GMDA & Regional Power Discoms',
            sourceUrl: 'https://delhijalboard.delhi.gov.in/',
            status: 'Official but limited',
            coverage: 'Administrative municipal ward level',
            limitations: 'Represents broad municipal ward schedules. Internal building overhead tanks and booster pumps affect water availability.'
          }
        },
        environmental: {
          incidents: environmental,
          confidence: { level: 'High', percentage: 85, description: 'Statutory hydrological flood maps and CPCB noise zoning standards.' },
          evidence: {
            sourceName: 'Central Pollution Control Board & Central Water Commission',
            sourceUrl: 'https://cpcb.nic.in/noise-pollution/',
            status: 'Verified',
            coverage: 'Delhi NCR flood basins & arterial acoustic transects',
            limitations: 'Micro-acoustic levels vary between outer highway facing buildings and interior park-facing plots.'
          }
        }
      };

      setReportData(report);
    } catch (err) {
      console.error('Error generating neighborhood report:', err);
      setError('Unable to load neighborhood intelligence data. Please verify your connection or click retry.');
    } finally {
      setIsLoading(false);
    }
  }, [lat, lon, radiusKm]);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  return {
    reportData,
    isLoading,
    error,
    refetch: loadReport
  };
}

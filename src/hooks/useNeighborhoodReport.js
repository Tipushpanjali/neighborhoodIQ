
import { useState, useEffect, useCallback } from 'react';
import { fetchNearbyPlaces } from '../services/placesService';
import { fetchColleges } from '../services/collegeService';
import { fetchDelhiSchools } from '../services/delhiSchoolService';
import { fetchAirQualityData } from '../services/airQualityService';
import {
  getNearbyInfrastructureProjects,
  getEnvironmentalIncidents
} from '../services/infrastructureService';
import { getUtilityObservations } from '../services/utilityService';
import { calculateConfidenceScore } from '../utils/confidence';

function getCollegeSearchQuery(propertyName = '') {
  const location = propertyName
    .replace(/\s+/g, ' ')
    .trim();

  if (!location) {
    return null;
  }

  const lowerLocation = location.toLowerCase();

  const knownCities = [
    'delhi',
    'noida',
    'greater noida',
    'gurugram',
    'gurgaon',
    'ghaziabad',
    'faridabad'
  ];

  const hasCity = knownCities.some(city =>
    lowerLocation.includes(city)
  );

  return hasCity ? location : `${location}, Delhi`;
}

export function useNeighborhoodReport(
  lat,
  lon,
  radiusKm = 2.0,
  priority = 'all',
  propertyName = ''
) {
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
      const collegeQuery = getCollegeSearchQuery(propertyName);

      // The school dataset covers Delhi only.
      const delhiSchoolQuery =
        collegeQuery &&
        collegeQuery.toLowerCase().includes('delhi')
          ? collegeQuery
          : null;

      const [
        places,
        airQuality,
        colleges,
        delhiSchools
      ] = await Promise.all([
        fetchNearbyPlaces(lat, lon, radiusKm),

        fetchAirQualityData(lat, lon),

        collegeQuery
          ? fetchColleges(collegeQuery)
          : Promise.resolve({
              items: [],
              status: 'not_searched',
              source: 'CollegeDB',
              errorMessage: 'Could not identify the selected city.',
              fetchedAt: null
            }),

        delhiSchoolQuery
          ? fetchDelhiSchools(delhiSchoolQuery)
          : Promise.resolve({
              items: [],
              status: 'not_searched',
              source: 'Delhi School Dataset',
              errorMessage: 'The selected city is outside this dataset’s Delhi-only coverage.',
              fetchedAt: null
            })
      ]);

      const infrastructure =
        getNearbyInfrastructureProjects(lat, lon, 15.0);

      const utility = getUtilityObservations(lat, lon);
      const environmental = getEnvironmentalIncidents(lat, lon);

      const osmStatus =
        places.status === 'live' ? 'Verified' : 'Data Unavailable';

      const osmLimitations =
        places.status === 'disabled'
          ? places.errorMessage
          : places.status === 'error'
            ? `OpenStreetMap request failed: ${places.errorMessage || 'Unknown error'}`
            : places.status === 'empty'
              ? 'OpenStreetMap returned no mapped features within the selected radius. This does not prove that no facilities exist.'
              : 'OpenStreetMap is community-maintained. Some facilities and roads may be missing or outdated.';

      // Determine category confidence levels.
      const aqConfidence = calculateConfidenceScore({
        sourceType: 'regulatory',
        distanceKm: airQuality.stationDistanceKm,
        dataAgeDays: 0,
        hasDirectReadings: true
      });

      // School dataset results are text matches, not distance-verified results.
      const schoolsConfidence = delhiSchools.items.length > 0
        ? {
            level: 'Limited',
            percentage: 40,
            description: 'Schools matched by locality text. Coordinates and nearest-distance verification are unavailable.'
          }
        : calculateConfidenceScore({
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
        true
      ].filter(Boolean).length;

      const report = {
        lat,
        lon,
        radiusKm,
        timestamp: new Date().toISOString(),

        overview: {
          roadsCount: (places.roads || []).length,
          schoolsCount:
            places.schools.length + delhiSchools.items.length,
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
          // Existing OpenStreetMap school results.
          items: places.schools,

          // New Delhi school dataset results.
          datasetItems: delhiSchools.items,
          datasetStatus: delhiSchools.status,
          datasetQuery: delhiSchoolQuery,

          datasetEvidence: {
            sourceName: 'Delhi School Dataset',
            status:
              delhiSchools.status === 'live'
                ? 'Available'
                : delhiSchools.status === 'empty'
                  ? 'No matching records'
                  : delhiSchools.status === 'not_searched'
                    ? 'Not searched'
                    : 'Data Unavailable',
            coverage: delhiSchoolQuery
              ? `Delhi locality text search: ${delhiSchoolQuery}`
              : 'Delhi-only dataset. The selected city is outside its identified coverage.',
            limitations:
              'Shows up to five address-text matches from the Delhi school dataset. These are not verified geographically nearest schools. Coordinates and distances are currently unavailable.'
          },

          // Existing CollegeDB results.
          colleges: colleges.items,
          collegeStatus: colleges.status,
          collegeQuery: collegeQuery,

          collegeEvidence: {
            sourceName: 'CollegeDB',
            sourceUrl: 'https://collegedb.in/',
            status:
              colleges.status === 'live'
                ? 'Verified'
                : colleges.status === 'empty'
                  ? 'No results'
                  : 'Data Unavailable',
            coverage: collegeQuery
              ? `Search matches for ${collegeQuery}`
              : 'City could not be identified',
            limitations:
              'CollegeDB provides up to five search matches. Results are not verified within the selected property radius. Geographic coordinates and distances are not provided by this search response.'
          },

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
          confidence: {
            level: 'Moderate',
            percentage: 70,
            description: 'Official municipal discom and water board notices.'
          },
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
          confidence: {
            level: 'High',
            percentage: 85,
            description: 'Statutory hydrological flood maps and CPCB noise zoning standards.'
          },
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
  }, [lat, lon, radiusKm, propertyName]);

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

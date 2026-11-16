
import { supabase } from '../lib/supabase';
import { calculateDistanceKm } from '../utils/distance';

// Reference locations only. These are NOT the stations
// supplying the OpenWeather readings.
const CPCB_STATIONS = [
  { name: 'Jawaharlal Nehru University (JNU), South Delhi', lat: 28.5380, lon: 77.1660, stationId: 'DL-JNU-01' },
  { name: 'R.K. Puram Sector 8, South West Delhi', lat: 28.5632, lon: 77.1869, stationId: 'DL-RKP-01' },
  { name: 'Anand Vihar CAAQMS, East Delhi', lat: 28.6476, lon: 77.3158, stationId: 'DL-ANV-01' },
  { name: 'Dwarka Sector 8 CAAQMS, South West Delhi', lat: 28.5710, lon: 77.0680, stationId: 'DL-DWR-01' },
  { name: 'Sector 51 CAAQMS, Gurugram', lat: 28.4320, lon: 77.0780, stationId: 'HR-GGN-51' },
  { name: 'Vikas Sadan CAAQMS, Gurugram', lat: 28.4590, lon: 77.0260, stationId: 'HR-GGN-VS' },
  { name: 'Sector 62 CAAQMS, Noida', lat: 28.6250, lon: 77.3620, stationId: 'UP-NOI-62' },
  { name: 'Sector 125 Amity CAAQMS, Noida', lat: 28.5440, lon: 77.3320, stationId: 'UP-NOI-125' },
  { name: 'Vasundhara CAAQMS, Ghaziabad', lat: 28.6600, lon: 77.3570, stationId: 'UP-GZB-VAS' }
];

export async function fetchAirQualityData(lat, lon) {
  try {
    const latitude = Number(lat);
    const longitude = Number(lon);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error('Invalid property coordinates.');
    }

    // Find the nearest listed reference station.
    let nearestStation = CPCB_STATIONS[0];
    let minDistance = Infinity;

    CPCB_STATIONS.forEach((station) => {
      const distance = calculateDistanceKm(
        latitude,
        longitude,
        station.lat,
        station.lon
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestStation = station;
      }
    });

    // Fetch live air pollution data through Supabase Edge Function.
    const { data, error } = await supabase.functions.invoke(
      'air-quality',
      {
        body: {
          lat: latitude,
          lon: longitude
        }
      }
    );

    if (error) {
      throw error;
    }

    if (!data || !data.success) {
      throw new Error(data?.error || 'Unable to retrieve air quality data.');
    }

    const components = data.components || {};

    return {
      stationName: nearestStation.name,
      stationId: nearestStation.stationId,
      stationDistanceKm: Number(minDistance.toFixed(1)),

      aqi: data.aqi,
      aqiScale: data.aqiScale,
      primaryPollutant: 'Not identified by OpenWeather',
      pollutants: components,

      lastUpdated: data.observedAt,
      fetchedAt: data.fetchedAt,
      trend: null,

      evidence: {
        sourceName: 'OpenWeather Air Pollution API',
        sourceUrl: 'https://openweathermap.org/api/air-pollution',
        status: 'Live API',
        coverage: `Live coordinate-based reading for ${latitude}, ${longitude}. Nearest listed CPCB reference location: ${nearestStation.name} (${minDistance.toFixed(1)} km away).`,
        limitations:
          'AQI uses OpenWeather scale 1–5, not the official CPCB AQI scale 0–500. The reading is not measured by the listed CPCB reference station. Historical trend and primary pollutant are not provided by this current-reading endpoint.'
      }
    };
  } catch (error) {
    console.error('Air quality service error:', error);
    throw error;
  }
}

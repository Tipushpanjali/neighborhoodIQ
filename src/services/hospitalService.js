
import { supabase } from '../lib/supabase';

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const earthRadiusKm = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export async function fetchNearbyHospitals(
  latitude,
  longitude,
  radiusKm = 2
) {
  if (
    latitude == null ||
    longitude == null ||
    !Number.isFinite(Number(latitude)) ||
    !Number.isFinite(Number(longitude))
  ) {
    return {
      items: [],
      status: 'not_searched',
      source: 'OpenStreetMap Hospital Dataset',
      errorMessage: 'Valid coordinates are required.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('osm_hospitals')
      .select(`
        id,
        name,
        latitude,
        longitude,
        category,
        subcategory,
        rank,
        source,
        source_date
      `);

    if (error) {
      throw error;
    }

    const hospitals = (data || [])
      .map((hospital) => {
        const distanceKm = calculateDistanceKm(
          Number(latitude),
          Number(longitude),
          Number(hospital.latitude),
          Number(hospital.longitude)
        );

        return {
          id: hospital.id,
          name: hospital.name,
          latitude: Number(hospital.latitude),
          longitude: Number(hospital.longitude),
          category: hospital.category,
          subcategory: hospital.subcategory,
          rank: hospital.rank,
          distanceKm: Number(distanceKm.toFixed(2)),
          source: 'OpenStreetMap India Extract',
          sourceDate: hospital.source_date
        };
      })
      .filter((hospital) => hospital.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return {
      items: hospitals,
      status: hospitals.length > 0 ? 'live' : 'empty',
      source: 'OpenStreetMap India Extract (10 February 2020)',
      fetchedAt: new Date().toISOString(),
      errorMessage: null
    };

  } catch (error) {
    console.error('Hospital search error:', error);

    return {
      items: [],
      status: 'error',
      source: 'OpenStreetMap India Extract',
      errorMessage: error.message || 'Unable to retrieve hospitals.'
    };
  }
}

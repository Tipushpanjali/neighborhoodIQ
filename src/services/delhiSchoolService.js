
import { supabase } from '../lib/supabase';

export async function fetchDelhiSchools(searchQuery) {
  if (!searchQuery || searchQuery.trim().length < 2) {
    return {
      items: [],
      status: 'not_searched',
      source: 'Delhi School Dataset',
      errorMessage: 'A valid locality is required.'
    };
  }

  try {
    const { data, error } = await supabase.rpc(
      'search_delhi_schools',
      {
        search_text: searchQuery.trim()
      }
    );

    if (error) {
      throw error;
    }

    const schools = (data || []).map((school) => ({
      id: school.id,
      name: school.school_name,
      address: school.address,
      mobile: school.mobile,
      website: school.link,
      matchScore: school.match_score,
      source: 'Delhi School Dataset'
    }));

    return {
      items: schools,
      status: schools.length > 0 ? 'live' : 'empty',
      source: 'Delhi School Dataset',
      fetchedAt: new Date().toISOString(),
      errorMessage: null
    };

  } catch (error) {
    console.error('Delhi school search error:', error);

    return {
      items: [],
      status: 'error',
      source: 'Delhi School Dataset',
      errorMessage: error.message || 'Unable to retrieve schools.'
    };
  }
}

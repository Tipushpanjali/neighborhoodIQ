
import { supabase } from '../lib/supabase';

/**
 * Search colleges through the secure CollegeDB Supabase Edge Function.
 * CollegeDB results are city-level search results, NOT radius-based results.
 */
export async function fetchColleges(query) {
  if (!query || typeof query !== 'string' || query.trim().length < 2) {
    return {
      items: [],
      status: 'error',
      source: 'CollegeDB',
      errorMessage: 'A valid city search query is required.',
      fetchedAt: null
    };
  }

  try {
    const { data, error } = await supabase.functions.invoke(
      'collegedb-search',
      {
        body: {
          query: query.trim()
        }
      }
    );

    if (error) {
      throw error;
    }

    if (!data || data.success !== true || !Array.isArray(data.results)) {
      throw new Error('Invalid CollegeDB response.');
    }

    const colleges = data.results.map((college) => ({
      id: college.id,
      name: college.name,
      city: college.city || 'Not available',
      state: college.state || 'Not available',
      type: 'College',
      source: 'CollegeDB'
    }));

    return {
      items: colleges,
      status: colleges.length > 0 ? 'live' : 'empty',
      source: 'CollegeDB',
      fetchedAt: data.fetchedAt || new Date().toISOString(),
      errorMessage: null
    };

  } catch (error) {
    console.error('CollegeDB service error:', error);

    return {
      items: [],
      status: 'error',
      source: 'CollegeDB',
      fetchedAt: null,
      errorMessage: error.message || 'Unable to retrieve college records.'
    };
  }
}

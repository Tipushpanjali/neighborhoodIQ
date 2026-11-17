
import { useState, useEffect, useRef } from 'react';
import { searchAddress } from '../services/geocodingService';

export function useLocationSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceTimerRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    // Every new query gets a unique request ID.
    const requestId = ++requestIdRef.current;

    // Clear any previously scheduled search.
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    const cleanQuery = query.trim();

    // Don't search for queries shorter than 2 characters.
    if (cleanQuery.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      setError(null);

      return;
    }

    setIsLoading(true);
    setError(null);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchAddress(cleanQuery);

        // Ignore results belonging to an older search.
        if (requestId !== requestIdRef.current) return;

        setSuggestions(results);
      } catch (err) {
        // Ignore errors from outdated searches.
        if (requestId !== requestIdRef.current) return;

        console.error('Location search failed:', err);

        setError(
          'Unable to fetch address suggestions. Please try again.'
        );

        setSuggestions([]);
      } finally {
        // Only the latest request can update loading state.
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }

      // Invalidate any request that is still running.
      requestIdRef.current++;
    };
  }, [query]);

  const clearSearch = () => {
    // Immediately invalidate previous requests.
    requestIdRef.current++;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    setQuery('');
    setSuggestions([]);
    setIsLoading(false);
    setError(null);
  };

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    error,
    clearSearch
  };
}

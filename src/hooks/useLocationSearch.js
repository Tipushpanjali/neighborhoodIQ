import { useState, useEffect, useRef } from 'react';
import { searchAddress } from '../services/geocodingService';

export function useLocationSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsLoading(true);
    setError(null);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchAddress(query);
        setSuggestions(results);
      } catch (err) {
        setError('Unable to fetch address suggestions. Please try again.');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsLoading(false);
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

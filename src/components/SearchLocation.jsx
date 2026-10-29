import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X, Loader2, Compass } from 'lucide-react';
import { useLocationSearch } from '../hooks/useLocationSearch';
import RadiusSelector from './RadiusSelector';
import { DEMO_NEIGHBORHOODS } from '../data/demoNeighborhoods';

export default function SearchLocation({
  onSelectLocation,
  initialRadius = 2.0,
  placeholder = "Search property address, locality, or sector in Delhi NCR..."
}) {
  const { query, setQuery, suggestions, isLoading, error, clearSearch } = useLocationSearch('');
  const [selectedRadius, setSelectedRadius] = useState(initialRadius);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (item) => {
    setQuery(item.name);
    setIsDropdownOpen(false);
    if (onSelectLocation) {
      onSelectLocation({
        name: item.name,
        displayName: item.displayName,
        lat: item.lat,
        lon: item.lon,
        radiusKm: selectedRadius
      });
    }
  };

  const handleQuickChipSelect = (neighborhood) => {
    setQuery(neighborhood.name);
    setIsDropdownOpen(false);
    if (onSelectLocation) {
      onSelectLocation({
        name: neighborhood.name,
        displayName: `${neighborhood.locality}, ${neighborhood.city}`,
        lat: neighborhood.lat,
        lon: neighborhood.lon,
        radiusKm: selectedRadius
      });
    }
  };

  const handleRadiusChange = (radius) => {
    setSelectedRadius(radius);
  };

  return (
    <div className="search-box-card" ref={wrapperRef}>
      <div className="search-input-wrapper">
        <Search className="search-input-icon" size={20} />
        <input
          type="text"
          className="search-input-field"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder={placeholder}
          aria-label="Property address or locality search"
        />
        {isLoading && <Loader2 className="search-spinner" size={18} />}
        {query && !isLoading && (
          <button
            type="button"
            onClick={clearSearch}
            className="btn-ghost"
            style={{ position: 'absolute', right: '0.8rem', padding: '4px' }}
            aria-label="Clear search input"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Autocomplete Suggestions Dropdown */}
      {isDropdownOpen && suggestions.length > 0 && (
        <ul className="suggestions-dropdown" role="listbox">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="suggestion-item"
              onClick={() => handleSelectSuggestion(item)}
              role="option"
              aria-selected={false}
            >
              <MapPin size={18} className="suggestion-icon" />
              <div>
                <div className="suggestion-title">{item.name}</div>
                <div className="suggestion-subtitle">{item.displayName}</div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Error state */}
      {error && (
        <div style={{ color: '#B94D3D', fontSize: '0.82rem', marginTop: '6px' }}>
          {error}
        </div>
      )}

      {/* Radius selector */}
      <RadiusSelector selectedRadius={selectedRadius} onChange={handleRadiusChange} />

      {/* Quick Delhi NCR Preset Chips */}
      <div className="quick-chips-wrapper">
        <span className="quick-chip-label">Popular Hubs:</span>
        {DEMO_NEIGHBORHOODS.slice(0, 5).map((n) => (
          <button
            key={n.id}
            type="button"
            className="quick-chip"
            onClick={() => handleQuickChipSelect(n)}
          >
            {n.locality}
          </button>
        ))}
      </div>
    </div>
  );
}

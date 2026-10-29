import React, { useState } from 'react';
import { MapPin, Clock, BookmarkPlus, Check, Share2, Layers } from 'lucide-react';
import RadiusSelector from './RadiusSelector';
import { formatTimestamp } from '../utils/formatters';

export default function ReportHeader({
  address = 'Vasant Kunj, South Delhi',
  locality = 'Vasant Kunj',
  lat = 28.5244,
  lon = 77.1588,
  radiusKm = 2.0,
  timestamp,
  coverageCount = 6,
  totalCategories = 7,
  onRadiusChange,
  onChangeLocationClick,
  onSaveToCompare
}) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (onSaveToCompare) {
      onSaveToCompare();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
  };

  return (
    <div className="report-header-banner">
      <div className="container">
        <div className="report-header-top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="pill-badge badge-official">Delhi NCR Intelligence Report</span>
              <span className="report-coords-badge">
                {lat.toFixed(4)}° N, {lon.toFixed(4)}° E
              </span>
            </div>
            <h1 className="report-location-title">{address}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#82756C', fontSize: '0.88rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> Generated: {formatTimestamp(timestamp)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Layers size={14} /> Data Coverage: {coverageCount}/{totalCategories} Categories Reliable
              </span>
            </div>
          </div>

          <div className="report-actions">
            <button
              type="button"
              className="btn-outline"
              onClick={onChangeLocationClick}
              aria-label="Change property location"
            >
              <MapPin size={16} />
              <span>Change Location</span>
            </button>

            <button
              type="button"
              className={`btn-primary ${isSaved ? 'btn-secondary' : ''}`}
              onClick={handleSave}
              aria-label="Save neighborhood to comparison list"
            >
              {isSaved ? <Check size={16} /> : <BookmarkPlus size={16} />}
              <span>{isSaved ? 'Saved for Compare' : 'Save to Compare'}</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <RadiusSelector selectedRadius={radiusKm} onChange={onRadiusChange} />
          <div style={{ fontSize: '0.82rem', color: '#82756C' }}>
            Analysis perimeter: <strong>{(Math.PI * radiusKm * radiusKm).toFixed(1)} sq km</strong> area
          </div>
        </div>
      </div>
    </div>
  );
}

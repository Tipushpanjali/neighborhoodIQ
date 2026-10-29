import React from 'react';

const RADIUS_OPTIONS = [
  { value: 0.5, label: '500 m' },
  { value: 1.0, label: '1 km' },
  { value: 2.0, label: '2 km' },
  { value: 5.0, label: '5 km' }
];

export default function RadiusSelector({ selectedRadius = 2.0, onChange }) {
  return (
    <div className="radius-selector">
      <span className="radius-label">Analysis Radius:</span>
      <div className="radius-btn-group" role="group" aria-label="Select neighborhood analysis radius">
        {RADIUS_OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            className={`radius-btn ${selectedRadius === opt.value ? 'active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

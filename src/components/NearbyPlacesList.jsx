import React from 'react';
import { formatDistance } from '../utils/distance';

export default function NearbyPlacesList({ items = [], emptyMessage = "No mapped facilities found within this radius.", maxItems = 5 }) {
  if (!items || items.length === 0) {
    return (
      <div style={{ padding: '16px', textAlign: 'center', color: '#82756C', fontSize: '0.88rem', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E8DCCB' }}>
        {emptyMessage}
      </div>
    );
  }

  const displayedItems = items.slice(0, maxItems);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {displayedItems.map((item, index) => (
        <div
          key={item.id || `place-${index}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8DCCB',
            borderRadius: '12px'
          }}
        >
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#392E29', marginBottom: '2px' }}>
              {item.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#82756C', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {item.type && <span>{item.type}</span>}
              {item.board && <span>• Board: {item.board}</span>}
              {item.beds && <span>• {item.beds} Beds</span>}
              {item.line && <span>• Line: {item.line}</span>}
              {item.grades && <span>• {item.grades}</span>}
            </div>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <span
              style={{
                backgroundColor: '#F5EBDD',
                color: '#392E29',
                padding: '3px 8px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700
              }}
            >
              {formatDistance(item.distanceKm)}
            </span>
          </div>
        </div>
      ))}

      {items.length > maxItems && (
        <div style={{ textAlign: 'center', marginTop: '4px', fontSize: '0.8rem', color: '#82756C' }}>
          + {items.length - maxItems} additional facilities in radius
        </div>
      )}
    </div>
  );
}

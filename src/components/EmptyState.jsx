import React from 'react';
import { MapPin, Search } from 'lucide-react';

export default function EmptyState({
  title = "No intelligence data found",
  description = "We could not find observations for this specific point. Try selecting a nearby sector or landmark in Delhi NCR.",
  actionText = "Explore Delhi NCR",
  onAction
}) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '48px 24px', maxWidth: '580px', margin: '40px auto' }}>
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#F9EBE8',
          color: '#B94D3D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}
      >
        <MapPin size={32} />
      </div>

      <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{title}</h3>
      <p style={{ color: '#82756C', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.5 }}>
        {description}
      </p>

      {onAction && (
        <button type="button" className="btn-primary" onClick={onAction}>
          <Search size={16} />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}

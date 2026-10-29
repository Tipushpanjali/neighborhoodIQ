import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="container" style={{ padding: '32px 16px' }}>
      {/* Banner Skeleton */}
      <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
        <div className="skeleton" style={{ width: '180px', height: '24px', marginBottom: '12px' }} />
        <div className="skeleton" style={{ width: '60%', height: '36px', marginBottom: '16px' }} />
        <div className="skeleton" style={{ width: '40%', height: '18px' }} />
      </div>

      {/* Grid Skeleton */}
      <div className="overview-metrics-grid">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="metric-stat-card">
            <div className="skeleton" style={{ width: '40px', height: '28px', margin: '0 auto 6px' }} />
            <div className="skeleton" style={{ width: '70px', height: '14px', margin: '0 auto' }} />
          </div>
        ))}
      </div>

      {/* Map and Category Cards Skeleton */}
      <div className="skeleton" style={{ width: '100%', height: '380px', borderRadius: '18px', marginBottom: '32px' }} />

      <div className="category-cards-grid">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="card" style={{ height: '280px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div className="skeleton" style={{ width: '38px', height: '38px', borderRadius: '10px' }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ width: '50%', height: '20px', marginBottom: '8px' }} />
                <div className="skeleton" style={{ width: '30%', height: '14px' }} />
              </div>
            </div>
            <div className="skeleton" style={{ width: '100%', height: '120px', borderRadius: '12px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

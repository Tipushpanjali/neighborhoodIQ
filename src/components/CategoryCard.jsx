import React from 'react';
import EvidencePanel from './EvidencePanel';

export default function CategoryCard({
  title,
  icon: Icon,
  iconColor = '#B94D3D',
  iconBg = '#F9EBE8',
  badgeText,
  evidence,
  children
}) {
  return (
    <div className="category-card">
      <div className="card-header-row">
        <div className="card-title-group">
          <div className="card-icon" style={{ backgroundColor: iconBg, color: iconColor }}>
            {Icon && <Icon size={20} />}
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '2px' }}>{title}</h3>
            {badgeText && <span style={{ fontSize: '0.8rem', color: '#82756C' }}>{badgeText}</span>}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, marginBottom: '16px' }}>
        {children}
      </div>

      {evidence && (
        <EvidencePanel
          sourceName={evidence.sourceName}
          sourceUrl={evidence.sourceUrl}
          status={evidence.status}
          lastUpdated={evidence.lastUpdated}
          coverage={evidence.coverage}
          limitations={evidence.limitations}
          confidence={evidence.confidence}
        />
      )}
    </div>
  );
}

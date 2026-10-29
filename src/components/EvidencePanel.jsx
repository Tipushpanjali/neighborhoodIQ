import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Shield, HelpCircle } from 'lucide-react';
import DataStatusBadge from './DataStatusBadge';

export default function EvidencePanel({
  sourceName,
  sourceUrl,
  status = 'Verified',
  lastUpdated,
  coverage,
  limitations,
  confidence
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="evidence-panel">
      <div className="evidence-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <DataStatusBadge status={status} />
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="evidence-source-link"
              title={`View authoritative documentation at ${sourceName}`}
            >
              <span>{sourceName}</span>
              <ExternalLink size={12} />
            </a>
          ) : (
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{sourceName}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="btn-ghost"
          style={{ fontSize: '0.78rem', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          aria-expanded={isOpen}
          aria-label="Toggle evidence and methodology details"
        >
          <span>{isOpen ? 'Hide Audit' : 'Audit & Confidence'}</span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {isOpen && (
        <div style={{ marginTop: '8px', animation: 'fadeIn 0.2s ease-in' }}>
          <div className="evidence-meta-row">
            {coverage && <span>Coverage: {coverage}</span>}
            {lastUpdated && <span>Updated: {lastUpdated}</span>}
          </div>

          {confidence && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.8rem' }}>
              <Shield size={14} color="#B94D3D" />
              <span>
                <strong>Evidence Confidence: {confidence.level} ({confidence.percentage}%)</strong> — {confidence.description}
              </span>
            </div>
          )}

          {limitations && (
            <div className="evidence-limitations">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', fontWeight: 600 }}>
                <HelpCircle size={13} />
                <span>Known Limitations & Epistemic Boundaries</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.79rem', color: '#554A42' }}>{limitations}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

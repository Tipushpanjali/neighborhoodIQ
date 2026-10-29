import React from 'react';
import { ExternalLink, ShieldCheck, Database, Info, AlertTriangle, Layers, BookOpen } from 'lucide-react';
import { DATA_SOURCES } from '../data/dataSources';

export default function DataSources() {
  return (
    <div className="main-content">
      <div className="container" style={{ paddingTop: '40px' }}>
        <div style={{ maxWidth: '800px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Database size={20} color="#B94D3D" />
            <span className="pill-badge badge-official">Transparency & Verification</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Data Sources & Methodology</h1>
          <p style={{ color: '#82756C', fontSize: '1.02rem', lineHeight: 1.6 }}>
            NeighborhoodIQ adheres to strict epistemic standards. We do not invent metrics, calculate opaque proprietary "livability scores", or claim live coverage where only periodic public censuses exist.
          </p>
        </div>

        {/* Core Principles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#B94D3D' }}>
              <ShieldCheck size={20} />
              <h3 style={{ fontSize: '1.15rem' }}>No Universal Score</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#82756C', lineHeight: 1.55 }}>
              A single composite number (e.g., "8.4/10") obscures trade-offs. A neighborhood with superb schools might experience high seasonal winter AQI; another might have direct metro access but deeper groundwater tables. We present category-specific findings so buyers can apply their personal priorities.
            </p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#E9BD55' }}>
              <Layers size={20} />
              <h3 style={{ fontSize: '1.15rem' }}>Data Availability != Quality</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#82756C', lineHeight: 1.55 }}>
              Newly developed sectors or peripheral urban villages frequently have fewer tagged amenities in open databases. We clearly distinguish "unmapped / data unavailable" from poor neighborhood quality so developing localities are not unfairly penalized.
            </p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: '#6D9274' }}>
              <BookOpen size={20} />
              <h3 style={{ fontSize: '1.15rem' }}>Verifiable Grounding</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#82756C', lineHeight: 1.55 }}>
              Every card embeds an audit trail linking directly to the statutory gazette, open data endpoint, or government registry. Buyers can verify every school board, hospital bed registration, and highway project target independently.
            </p>
          </div>
        </div>

        {/* Authoritative Sources Directory */}
        <h2 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Authoritative Sources Directory</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
          {DATA_SOURCES.map(source => (
            <div key={source.id} className="card" style={{ backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#392E29' }}>{source.name}</h3>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ padding: '2px 8px', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>Visit Portal</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#82756C', marginTop: '2px' }}>
                    Category: <strong>{source.category}</strong> • Type: {source.sourceType}
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#82756C' }}>
                  <div>Last Checked: <strong>{source.lastChecked}</strong></div>
                  <div>Update Cadence: {source.updateFrequency}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E8DCCB', fontSize: '0.84rem' }}>
                <div>
                  <strong style={{ color: '#392E29', display: 'block', marginBottom: '2px' }}>Geographic Coverage</strong>
                  <p style={{ color: '#82756C', margin: 0 }}>{source.coverage}</p>
                </div>

                <div>
                  <strong style={{ color: '#392E29', display: 'block', marginBottom: '2px' }}>Licensing & Terms</strong>
                  <p style={{ color: '#82756C', margin: 0 }}>{source.licensing}</p>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <strong style={{ color: '#B94D3D', display: 'block', marginBottom: '2px' }}>Known Limitations & Epistemic Boundaries</strong>
                  <p style={{ color: '#554A42', margin: 0 }}>{source.limitations}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShieldCheck, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ marginBottom: '12px' }}>
              <div className="brand-icon">
                <Home size={18} />
              </div>
              <div>
                <span>Neighborhood</span>
                <span style={{ color: '#B94D3D' }}>IQ</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#82756C', maxWidth: '340px', lineHeight: 1.55 }}>
              Objective neighborhood intelligence for prospective homebuyers in Delhi NCR. Synthesizing environmental observations, amenities, transit, and infrastructure into transparent reports.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Platform
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <Link to="/explore">Explore Locality</Link>
              <Link to="/compare">Neighborhood Comparison</Link>
              <Link to="/sources">Data Sources & Audits</Link>
              <a href="#how-it-works">How It Works</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Authoritative Sources
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: '#82756C' }}>
              <a href="https://airquality.cpcb.gov.in/AQI_India/" target="_blank" rel="noopener noreferrer">CPCB NAQI Portal</a>
              <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OpenStreetMap Overpass</a>
              <a href="https://otd.delhi.gov.in/documentation/" target="_blank" rel="noopener noreferrer">Open Transit Data Delhi</a>
              <a href="https://www.udiseplus.gov.in/" target="_blank" rel="noopener noreferrer">UDISE+ National School Directory</a>
              <a href="https://facility.abdm.gov.in/" target="_blank" rel="noopener noreferrer">ABDM Health Facility Registry</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Contact & Disclaimers
            </h4>
            <div style={{ fontSize: '0.85rem', color: '#82756C', lineHeight: 1.5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Mail size={14} />
                <span>contact@neighborhoodiq.demo [Placeholder]</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <MapPin size={14} />
                <span>Delhi NCR, India [Research Prototype]</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#A3968C' }}>
                This is a frontend research prototype. All scores represent empirical data coverage and verified registries rather than commercial property valuations.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} NeighborhoodIQ. Open geospatial and civic intelligence for Delhi NCR.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy [Placeholder]</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service [Placeholder]</span>
            <span style={{ cursor: 'pointer' }}>Methodology Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

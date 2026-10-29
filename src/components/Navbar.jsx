import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Layers, GitCompare, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="brand-icon">
            <Home size={20} />
          </div>
          <div>
            <span>Neighborhood</span>
            <span style={{ color: '#B94D3D' }}>IQ</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/explore" className={`nav-link ${isActive('/explore') ? 'active' : ''}`}>
                Explore
              </Link>
            </li>
            <li>
              <Link to="/#how-it-works" className="nav-link">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/compare" className={`nav-link ${isActive('/compare') ? 'active' : ''}`}>
                Compare
              </Link>
            </li>
            <li>
              <Link to="/sources" className={`nav-link ${isActive('/sources') ? 'active' : ''}`}>
                Data Sources
              </Link>
            </li>
          </ul>
        </nav>

        {/* Action Button */}
        <div className="nav-actions">
          <Link to="/explore" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}>
            <Compass size={16} />
            <span>Explore Neighborhood</span>
          </Link>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div style={{ backgroundColor: '#FFF9F0', borderTop: '1px solid #E8DCCB', padding: '16px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              to="/explore"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Explore Delhi NCR
            </Link>
            <Link
              to="/compare"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Compare Neighborhoods
            </Link>
            <Link
              to="/sources"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Data Sources & Methodology
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}


import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link
          to="/"
          className="brand-logo"
          onClick={closeMobileMenu}
        >
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
              <Link
                to="/explore"
                className={`nav-link ${isActive('/explore') ? 'active' : ''}`}
              >
                Explore
              </Link>
            </li>

            <li>
              <Link to="/#how-it-works" className="nav-link">
                How It Works
              </Link>
            </li>

            <li>
              <Link
                to="/compare"
                className={`nav-link ${isActive('/compare') ? 'active' : ''}`}
              >
                Compare
              </Link>
            </li>

            <li>
              <Link
                to="/sources"
                className={`nav-link ${isActive('/sources') ? 'active' : ''}`}
              >
                Data Sources
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="nav-actions">
          {user ? (
            <>
              <span style={{ fontSize: '0.85rem' }}>
                {user.user_metadata?.full_name || user.email}
              </span>

              <button
                type="button"
                className="btn-primary"
                onClick={handleLogout}
                style={{ padding: '0.6rem 1rem', fontSize: '0.88rem' }}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-link"
                style={{ padding: '0.6rem 0.8rem' }}
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="btn-primary"
                style={{ padding: '0.6rem 1rem', fontSize: '0.88rem' }}
              >
                Sign Up
              </Link>
            </>
          )}

          <Link
            to="/explore"
            className="btn-primary"
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}
          >
            <Compass size={16} />
            <span>Explore Neighborhood</span>
          </Link>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFF9F0',
            borderTop: '1px solid #E8DCCB',
            padding: '16px 24px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link
              to="/explore"
              className="nav-link"
              onClick={closeMobileMenu}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Explore Delhi NCR
            </Link>

            <Link
              to="/compare"
              className="nav-link"
              onClick={closeMobileMenu}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Compare Neighborhoods
            </Link>

            <Link
              to="/sources"
              className="nav-link"
              onClick={closeMobileMenu}
              style={{ fontSize: '1rem', padding: '8px 0' }}
            >
              Data Sources & Methodology
            </Link>

            {user ? (
              <button
                type="button"
                className="btn-primary"
                onClick={handleLogout}
                style={{ alignSelf: 'flex-start', padding: '0.6rem 1rem' }}
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={closeMobileMenu}
                  style={{ fontSize: '1rem', padding: '8px 0' }}
                >
                  Log In
                </Link>

                <Link
                  to="/signup"
                  className="nav-link"
                  onClick={closeMobileMenu}
                  style={{ fontSize: '1rem', padding: '8px 0' }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="card" style={{ textAlign: 'center', maxWidth: '480px', padding: '40px 24px' }}>
        <h1 style={{ fontSize: '3rem', color: '#B94D3D', marginBottom: '8px' }}>404</h1>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Neighborhood Not Found</h2>
        <p style={{ color: '#82756C', marginBottom: '24px', fontSize: '0.95rem' }}>
          The page or neighborhood coordinates you requested do not exist or have moved.
        </p>
        <Link to="/" className="btn-primary">
          <Home size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

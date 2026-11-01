
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Unable to log in.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Google login failed.');
      setLoading(false);
    }
  };

  return (
    <main
      className="container"
      style={{ maxWidth: '480px', padding: '3rem 1rem' }}
    >
      <section
        style={{
          background: '#FFF9F0',
          border: '1px solid #E8DCCB',
          borderRadius: '16px',
          padding: '2rem'
        }}
      >
        <h1 style={{ marginTop: 0 }}>Welcome back</h1>
        <p>Log in to access your saved neighborhoods and comparisons.</p>

        {error && (
          <p role="alert" style={{ color: '#B42318' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="loginEmail">Email address</label>
            <input
              id="loginEmail"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                display: 'block',
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.4rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                display: 'block',
                width: '100%',
                padding: '0.75rem',
                marginTop: '0.4rem'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem'
            }}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '1rem 0' }}>or</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.85rem',
            background: '#FFFFFF',
            border: '1px solid #D6C9B8',
            borderRadius: '8px',
            cursor: loading ? 'wait' : 'pointer'
          }}
        >
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginBottom: 0, marginTop: '1.5rem' }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
}


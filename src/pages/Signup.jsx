
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const data = await signUp(fullName.trim(), email.trim(), password);

      if (data.session) {
        navigate('/report');
      } else {
        setMessage(
          'Account created! Please check your email to confirm your account before logging in.'
        );
      }
    } catch (err) {
      setError(err.message || 'Unable to create your account.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Google signup failed.');
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ maxWidth: '480px', padding: '3rem 1rem' }}>
      <section
        style={{
          background: '#FFF9F0',
          border: '1px solid #E8DCCB',
          borderRadius: '16px',
          padding: '2rem'
        }}
      >
        <h1 style={{ marginTop: 0 }}>Create your account</h1>
        <p>Join NeighborhoodIQ to save and compare neighborhoods.</p>

        {error && (
          <p role="alert" style={{ color: '#B42318' }}>
            {error}
          </p>
        )}

        {message && (
          <p role="status" style={{ color: '#267344' }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              maxLength={100}
              style={{ display: 'block', width: '100%', padding: '0.75rem', marginTop: '0.4rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="signupEmail">Email address</label>
            <input
              id="signupEmail"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: 'block', width: '100%', padding: '0.75rem', marginTop: '0.4rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="signupPassword">Password</label>
            <input
              id="signupPassword"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              style={{ display: 'block', width: '100%', padding: '0.75rem', marginTop: '0.4rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
              style={{ display: 'block', width: '100%', padding: '0.75rem', marginTop: '0.4rem' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '1rem 0' }}>or</div>

        <button
          type="button"
          onClick={handleGoogleSignup}
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
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}

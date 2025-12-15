import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../utils/api';

const Login = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #DADDE2 0%, #C7D3E0 50%, #DADDE2 100%)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'gradientShift 8s ease-in-out infinite'
  };

  const formStyle = {
    backgroundColor: '#F8F9FB',
    padding: '3rem',
    borderRadius: '25px',
    boxShadow: '0 30px 60px rgba(218, 221, 226, 0.4)',
    width: '450px',
    maxWidth: '90%',
    backdropFilter: 'blur(15px)',
    border: '2px solid rgba(199, 211, 224, 0.3)',
    animation: 'floatUp 3s ease-in-out infinite alternate'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #DADDE2 0%, #9FB3C8 100%)',
    color: '#2E2E2E',
    border: 'none',
    borderRadius: '15px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    boxShadow: '0 10px 25px rgba(218, 221, 226, 0.4)',
    animation: 'pulse 2s infinite'
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
          <h1 style={{ color: '#2E2E2E', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: '700', animation: 'slideInDown 1s ease-out' }}>Invoice Generator</h1>
          <p style={{ color: '#2E2E2E', fontSize: '1rem', marginBottom: '2rem', animation: 'fadeIn 1.5s ease-out' }}>Professional invoicing made simple. Create, manage, and track your business invoices with ease.</p>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2E2E2E', fontSize: '1.5rem', animation: 'slideInLeft 1.2s ease-out' }}>Welcome Back</h2>
        
        {error && (
          <div style={{ color: '#ff4757', textAlign: 'center', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <button 
          type="submit" 
          disabled={loading}
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.background = 'linear-gradient(135deg, #9FB3C8 0%, #C7D3E0 100%)'}
          onMouseOut={(e) => e.target.style.background = 'linear-gradient(135deg, #DADDE2 0%, #9FB3C8 100%)'}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#9FB3C8' }}>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
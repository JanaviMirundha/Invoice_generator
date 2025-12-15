import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../utils/api';

const Register = ({ setIsAuthenticated, setUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      const response = await authAPI.register(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    width: '400px',
    maxWidth: '90%'
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
    padding: '0.75rem',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Register</h2>
        
        {error && (
          <div style={{ color: '#ff4757', textAlign: 'center', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

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
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
          required
          minLength="6"
        />

        <button 
          type="submit" 
          disabled={loading}
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#667eea' }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  const location = useLocation();

  const navStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem 2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 1rem',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'all 0.3s ease'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255,255,255,0.2)',
    fontWeight: 'bold'
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ color: 'white', margin: 0, marginRight: '2rem' }}>Invoice Generator</h2>
          <Link to="/home" style={location.pathname === '/home' ? activeLinkStyle : linkStyle}>Home</Link>
          <Link to="/dashboard" style={location.pathname === '/dashboard' ? activeLinkStyle : linkStyle}>Dashboard</Link>
          <Link to="/create-invoice" style={location.pathname === '/create-invoice' ? activeLinkStyle : linkStyle}>Create Invoice</Link>
          <Link to="/about" style={location.pathname === '/about' ? activeLinkStyle : linkStyle}>About</Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'white', marginRight: '1rem' }}>Welcome, {user?.name}</span>
          <button 
            onClick={logout}
            style={{
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ff3742'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ff4757'}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
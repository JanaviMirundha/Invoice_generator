import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  const location = useLocation();

  const navStyle = {
    background: 'linear-gradient(135deg, #DADDE2 0%, #C7D3E0 100%)',
    padding: '1rem 2rem',
    boxShadow: '0 4px 20px rgba(218, 221, 226, 0.4)',
    backdropFilter: 'blur(15px)',
    animation: 'slideInDown 0.8s ease-out'
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
          <h2 style={{ color: '#2E2E2E', margin: 0, marginRight: '2rem', fontWeight: '700' }}>Invoice Generator</h2>
          <Link to="/home" style={location.pathname === '/home' ? activeLinkStyle : linkStyle}>Home</Link>
          <Link to="/dashboard" style={location.pathname === '/dashboard' ? activeLinkStyle : linkStyle}>Dashboard</Link>
          <Link to="/create-invoice" style={location.pathname === '/create-invoice' ? activeLinkStyle : linkStyle}>Create Invoice</Link>
          <Link to="/about" style={location.pathname === '/about' ? activeLinkStyle : linkStyle}>About</Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#2E2E2E', marginRight: '1rem', fontWeight: '600' }}>Welcome, {user?.name}</span>
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
            onMouseOver={(e) => e.target.style.backgroundColor = '#e74c3c'}
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
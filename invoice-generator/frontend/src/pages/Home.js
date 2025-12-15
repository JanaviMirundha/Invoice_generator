import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  const containerStyle = {
    padding: '2rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '15px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const buttonStyle = {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '0.5rem',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: '#333', marginBottom: '1rem', fontSize: '3rem' }}>
          Welcome to Invoice Generator
        </h1>
        <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '2rem' }}>
          Hello {user?.name}! Create professional invoices with ease.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link 
            to="/create-invoice" 
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#5a67d8';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#667eea';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Create New Invoice
          </Link>
          
          <Link 
            to="/dashboard" 
            style={{...buttonStyle, backgroundColor: '#2ed573'}}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#26d065';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#2ed573';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            View Dashboard
          </Link>
        </div>

        <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📄</div>
            <h3 style={{ color: '#333' }}>Professional Invoices</h3>
            <p style={{ color: '#666' }}>Create clean, professional invoices</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💼</div>
            <h3 style={{ color: '#333' }}>Business Ready</h3>
            <p style={{ color: '#666' }}>Perfect for small businesses</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📊</div>
            <h3 style={{ color: '#333' }}>Track Everything</h3>
            <p style={{ color: '#666' }}>Monitor all your invoices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
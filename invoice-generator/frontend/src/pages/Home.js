import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  const containerStyle = {
    padding: '2rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #DADDE2 0%, #C7D3E0 50%, #DADDE2 100%)',
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const cardStyle = {
    backgroundColor: '#F8F9FB',
    padding: '3rem',
    borderRadius: '25px',
    boxShadow: '0 30px 60px rgba(218, 221, 226, 0.4)',
    maxWidth: '800px',
    margin: '0 auto',
    backdropFilter: 'blur(15px)',
    border: '2px solid rgba(199, 211, 224, 0.3)',
    animation: 'bounceIn 1s ease-out'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #DADDE2 0%, #9FB3C8 100%)',
    color: '#2E2E2E',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '15px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '0.5rem',
    transition: 'all 0.4s ease',
    transform: 'translateY(0)',
    boxShadow: '0 10px 25px rgba(218, 221, 226, 0.4)',
    animation: 'pulse 2s infinite'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: '#2E2E2E', marginBottom: '1rem', fontSize: '3rem', animation: 'slideInDown 1s ease-out' }}>
          Welcome to Invoice Generator
        </h1>
        <p style={{ color: '#2E2E2E', fontSize: '1.2rem', marginBottom: '2rem', animation: 'fadeIn 1.5s ease-out' }}>
          Hello {user?.name}! Create professional invoices with ease.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link 
            to="/create-invoice" 
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #9FB3C8 0%, #C7D3E0 100%)';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 15px 30px rgba(159, 179, 200, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #DADDE2 0%, #9FB3C8 100%)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 25px rgba(218, 221, 226, 0.4)';
            }}
          >
            Create New Invoice
          </Link>
          
          <Link 
            to="/dashboard" 
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #9FB3C8 0%, #C7D3E0 100%)';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 15px 30px rgba(159, 179, 200, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #DADDE2 0%, #9FB3C8 100%)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 25px rgba(218, 221, 226, 0.4)';
            }}
          >
            View Dashboard
          </Link>
        </div>

        <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📄</div>
            <h3 style={{ color: '#2E2E2E' }}>Professional Invoices</h3>
            <p style={{ color: '#2E2E2E' }}>Create clean, professional invoices</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💼</div>
            <h3 style={{ color: '#2E2E2E' }}>Business Ready</h3>
            <p style={{ color: '#2E2E2E' }}>Perfect for small businesses</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📊</div>
            <h3 style={{ color: '#2E2E2E' }}>Track Everything</h3>
            <p style={{ color: '#2E2E2E' }}>Monitor all your invoices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
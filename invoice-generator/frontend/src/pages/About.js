import React from 'react';

const About = () => {
  const containerStyle = {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #DADDE2 0%, #C7D3E0 50%, #DADDE2 100%)',
    minHeight: 'calc(100vh - 80px)'
  };

  const cardStyle = {
    backgroundColor: '#F8F9FB',
    padding: '3rem',
    borderRadius: '25px',
    boxShadow: '0 30px 60px rgba(218, 221, 226, 0.4)',
    marginBottom: '2rem',
    backdropFilter: 'blur(15px)',
    border: '2px solid rgba(199, 211, 224, 0.3)',
    animation: 'bounceIn 1s ease-out'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: '#2E2E2E', textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '700', animation: 'slideInDown 1s ease-out' }}>About Invoice Generator</h1>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 8px rgba(218, 221, 226, 0.3))' }}>📄</div>
          <p style={{ fontSize: '1.3rem', color: '#2E2E2E', lineHeight: '1.7', animation: 'fadeIn 1.5s ease-out' }}>
            A modern, professional invoice generator built with the MERN stack. 
            Create, manage, and track your business invoices with ease.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2E2E2E', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '600', animation: 'slideInLeft 1.2s ease-out' }}>Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(218, 221, 226, 0.2) 0%, rgba(199, 211, 224, 0.2) 100%)', borderRadius: '15px', border: '2px solid rgba(159, 179, 200, 0.3)', animation: 'bounceIn 1.5s ease-out' }}>
              <h3 style={{ color: '#2E2E2E', marginBottom: '0.8rem', fontSize: '1.2rem', fontWeight: '600' }}>🔐 Secure Authentication</h3>
              <p style={{ color: '#2E2E2E', margin: 0, fontSize: '1rem' }}>JWT-based login and registration system</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(218, 221, 226, 0.2) 0%, rgba(199, 211, 224, 0.2) 100%)', borderRadius: '15px', border: '2px solid rgba(159, 179, 200, 0.3)', animation: 'bounceIn 1.5s ease-out' }}>
              <h3 style={{ color: '#2E2E2E', marginBottom: '0.8rem', fontSize: '1.2rem', fontWeight: '600' }}>📊 Dashboard</h3>
              <p style={{ color: '#2E2E2E', margin: 0, fontSize: '1rem' }}>View and manage all your invoices</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(218, 221, 226, 0.2) 0%, rgba(199, 211, 224, 0.2) 100%)', borderRadius: '15px', border: '2px solid rgba(159, 179, 200, 0.3)', animation: 'bounceIn 1.5s ease-out' }}>
              <h3 style={{ color: '#2E2E2E', marginBottom: '0.8rem', fontSize: '1.2rem', fontWeight: '600' }}>🧮 Auto Calculations</h3>
              <p style={{ color: '#2E2E2E', margin: 0, fontSize: '1rem' }}>Automatic tax and total calculations</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(218, 221, 226, 0.2) 0%, rgba(199, 211, 224, 0.2) 100%)', borderRadius: '15px', border: '2px solid rgba(159, 179, 200, 0.3)', animation: 'bounceIn 1.5s ease-out' }}>
              <h3 style={{ color: '#2E2E2E', marginBottom: '0.8rem', fontSize: '1.2rem', fontWeight: '600' }}>🖨️ Print & Export</h3>
              <p style={{ color: '#2E2E2E', margin: 0, fontSize: '1rem' }}>Print invoices or export as PDF</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg, rgba(218, 221, 226, 0.25) 0%, rgba(159, 179, 200, 0.25) 100%)', borderRadius: '20px', border: '2px solid rgba(159, 179, 200, 0.4)' }}>
          <h3 style={{ color: '#2E2E2E', marginBottom: '1.5rem', fontSize: '1.8rem', fontWeight: '700' }}>Perfect for Small Businesses</h3>
          <p style={{ color: '#2E2E2E', margin: 0, fontSize: '1.2rem', lineHeight: '1.6' }}>
            Streamline your billing process with professional invoices that help you get paid faster.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
import React from 'react';

const About = () => {
  const containerStyle = {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  };



  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '2rem' }}>About Invoice Generator</h1>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.6' }}>
            A modern, professional invoice generator built with the MERN stack. 
            Create, manage, and track your business invoices with ease.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🔐 Secure Authentication</h3>
              <p style={{ color: '#666', margin: 0 }}>JWT-based login and registration system</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>📊 Dashboard</h3>
              <p style={{ color: '#666', margin: 0 }}>View and manage all your invoices</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🧮 Auto Calculations</h3>
              <p style={{ color: '#666', margin: 0 }}>Automatic tax and total calculations</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🖨️ Print & Export</h3>
              <p style={{ color: '#666', margin: 0 }}>Print invoices or export as PDF</p>
            </div>
          </div>
        </div>



        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Perfect for Small Businesses</h3>
          <p style={{ color: '#666', margin: 0, fontSize: '1.1rem' }}>
            Streamline your billing process with professional invoices that help you get paid faster.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
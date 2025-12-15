import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { invoiceAPI } from '../utils/api';

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await invoiceAPI.getAll();
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await invoiceAPI.delete(id);
        setInvoices(invoices.filter(invoice => invoice._id !== id));
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #DADDE2 0%, #C7D3E0 50%, #DADDE2 100%)',
    minHeight: 'calc(100vh - 80px)'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#F8F9FB',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 30px 60px rgba(218, 221, 226, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(199, 211, 224, 0.3)'
  };

  const thStyle = {
    background: 'linear-gradient(135deg, #DADDE2 0%, #9FB3C8 100%)',
    color: '#2E2E2E',
    padding: '1.2rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '1rem'
  };

  const tdStyle = {
    padding: '1rem',
    borderBottom: '1px solid #eee'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    margin: '0 0.25rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  };

  if (loading) {
    return (
      <div style={{ ...containerStyle, textAlign: 'center' }}>
        <h2>Loading invoices...</h2>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2E2E2E', fontSize: '2.5rem', fontWeight: '700', textShadow: '0 4px 8px rgba(218, 221, 226, 0.3)', animation: 'slideInDown 1s ease-out' }}>Invoice Dashboard</h1>
        <Link 
          to="/create-invoice"
          style={{
            ...buttonStyle,
            background: 'linear-gradient(135deg, #DADDE2 0%, #9FB3C8 100%)',
            color: '#2E2E2E',
            boxShadow: '0 8px 20px rgba(218, 221, 226, 0.4)',
            fontWeight: '600'
          }}
        >
          Create New Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#F8F9FB', borderRadius: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 30px 60px rgba(218, 221, 226, 0.4)' }}>
          <h3 style={{ color: '#2E2E2E', fontSize: '1.5rem' }}>No invoices found</h3>
          <p style={{ color: '#2E2E2E', fontSize: '1.1rem' }}>Create your first invoice to get started!</p>
          <Link to="/create-invoice" style={{ color: '#9FB3C8' }}>Create Invoice</Link>
        </div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Invoice #</th>
              <th style={thStyle}>Client Name</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Total Amount</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td style={tdStyle}>{invoice.invoiceNumber}</td>
                <td style={tdStyle}>{invoice.clientName}</td>
                <td style={tdStyle}>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                <td style={tdStyle}>${invoice.grandTotal.toFixed(2)}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    backgroundColor: 
                      invoice.status === 'Paid' ? '#2ed573' :
                      invoice.status === 'Pending' ? '#3742fa' :
                      invoice.status === 'Overdue' ? '#ff4757' : '#ffa502',
                    color: 'white'
                  }}>
                    {invoice.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  <Link 
                    to={`/invoice/${invoice._id}`}
                    style={{
                      ...buttonStyle,
                      backgroundColor: '#9FB3C8',
                      color: 'white'
                    }}
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => deleteInvoice(invoice._id)}
                    style={{
                      ...buttonStyle,
                      backgroundColor: '#ff4757',
                      color: 'white'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
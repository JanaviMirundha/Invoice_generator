import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { invoiceAPI } from '../utils/api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoicePreview = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchInvoice = async () => {
    try {
      const response = await invoiceAPI.getById(id);
      setInvoice(response.data);
    } catch (error) {
      console.error('Error fetching invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('invoice-content');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading invoice...</div>;
  }

  if (!invoice) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Invoice not found</div>;
  }

  const containerStyle = {
    maxWidth: '800px',
    margin: '2rem auto',
    backgroundColor: 'white',
    padding: '2rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    borderRadius: '10px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #667eea'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem'
  };

  const thStyle = {
    backgroundColor: '#f8f9fa',
    padding: '0.75rem',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
  };

  const tdStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #eee'
  };

  const buttonStyle = {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0.5rem',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  };

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8f9fa' }}>
        <button onClick={handlePrint} style={buttonStyle}>Print Invoice</button>
        <button onClick={handleDownloadPDF} style={{ ...buttonStyle, backgroundColor: '#2ed573' }}>
          Download PDF
        </button>
      </div>

      <div style={containerStyle} id="invoice-content">
        <div style={headerStyle}>
          <div>
            <h1 style={{ color: '#667eea', margin: 0 }}>INVOICE</h1>
            <p style={{ margin: '0.5rem 0', color: '#666' }}>#{invoice.invoiceNumber}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>
              LOGO
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>From:</h3>
            <div style={{ color: '#666' }}>
              <strong>{invoice.companyName}</strong><br />
              {invoice.companyAddress.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>To:</h3>
            <div style={{ color: '#666' }}>
              <strong>{invoice.clientName}</strong><br />
              {invoice.clientAddress.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <strong>Invoice Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}
          </div>
          <div>
            <strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}
          </div>
        </div>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Item</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.name}</td>
                <td style={tdStyle}>{item.quantity}</td>
                <td style={tdStyle}>${item.price.toFixed(2)}</td>
                <td style={tdStyle}>${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ minWidth: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              <span>Subtotal:</span>
              <span>${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              <span>Tax ({invoice.taxPercentage}%):</span>
              <span>${invoice.taxAmount.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              <span>Discount:</span>
              <span>-${invoice.discount.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.2rem', fontWeight: 'bold', borderTop: '2px solid #333' }}>
              <span>Grand Total:</span>
              <span>${invoice.grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            <strong>Status:</strong> 
            <span style={{
              marginLeft: '0.5rem',
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
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
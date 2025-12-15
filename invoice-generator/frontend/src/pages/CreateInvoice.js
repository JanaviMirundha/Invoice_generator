import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoiceAPI } from '../utils/api';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    clientName: '',
    clientAddress: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ name: '', quantity: 1, price: 0, total: 0 }],
    taxPercentage: 0,
    discount: 0,
    status: 'Unpaid'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['taxPercentage', 'discount'];
    setFormData({ 
      ...formData, 
      [name]: numericFields.includes(name) ? parseFloat(value) || 0 : value 
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 1, price: 0, total: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = (subtotal * formData.taxPercentage) / 100;
    const grandTotal = subtotal + taxAmount - formData.discount;
    
    return { subtotal, taxAmount, grandTotal };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subtotal, taxAmount, grandTotal } = calculateTotals();
    
    const invoiceData = {
      ...formData,
      subtotal,
      taxAmount,
      grandTotal
    };

    try {
      const response = await invoiceAPI.create(invoiceData);
      navigate(`/invoice/${response.data._id}`);
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Error creating invoice: ' + (error.response?.data?.message || error.message));
    }
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

  const containerStyle = {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #DADDE2 0%, #C7D3E0 50%, #DADDE2 100%)',
    minHeight: 'calc(100vh - 80px)'
  };

  const formStyle = {
    backgroundColor: '#F8F9FB',
    padding: '3rem',
    borderRadius: '25px',
    boxShadow: '0 30px 60px rgba(218, 221, 226, 0.4)',
    backdropFilter: 'blur(15px)',
    border: '2px solid rgba(199, 211, 224, 0.3)',
    animation: 'bounceIn 1s ease-out'
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
    background: 'linear-gradient(135deg, #DADDE2 0%, #9FB3C8 100%)',
    color: '#2E2E2E',
    padding: '1rem 1.5rem',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '700',
    transition: 'all 0.4s ease',
    boxShadow: '0 10px 25px rgba(218, 221, 226, 0.4)',
    animation: 'pulse 2s infinite'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', color: '#2E2E2E', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '700', animation: 'slideInDown 1s ease-out' }}>Create Invoice</h1>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ color: '#2E2E2E', marginBottom: '1rem' }}>Company Details</h3>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <textarea
              name="companyAddress"
              placeholder="Company Address"
              value={formData.companyAddress}
              onChange={handleChange}
              style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
              required
            />
          </div>
          
          <div>
            <h3 style={{ color: '#2E2E2E', marginBottom: '1rem' }}>Client Details</h3>
            <input
              type="text"
              name="clientName"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
            <textarea
              name="clientAddress"
              placeholder="Client Address"
              value={formData.clientAddress}
              onChange={handleChange}
              style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ color: '#2E2E2E', fontWeight: '600' }}>Invoice Date:</label>
            <input
              type="date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={{ color: '#2E2E2E', fontWeight: '600' }}>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        </div>

        <h3 style={{ color: '#2E2E2E', marginBottom: '1rem' }}>Items</h3>
        {formData.items.map((item, index) => (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              style={inputStyle}
              required
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
              style={inputStyle}
              min="1"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
              style={inputStyle}
              min="0"
              step="0.01"
              required
            />
            <input
              type="number"
              value={item.total.toFixed(2)}
              style={{ ...inputStyle, backgroundColor: '#f5f5f5' }}
              readOnly
            />
            {formData.items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                style={{ ...buttonStyle, background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)', padding: '0.5rem', color: 'white' }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addItem}
          style={{ ...buttonStyle, background: 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)', marginBottom: '2rem', color: 'white' }}
        >
          Add Item
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ color: '#2E2E2E', fontWeight: '600' }}>Tax %:</label>
            <input
              type="number"
              name="taxPercentage"
              value={formData.taxPercentage}
              onChange={handleChange}
              style={inputStyle}
              min="0"
              max="100"
              step="0.01"
            />
          </div>
          <div>
            <label style={{ color: '#2E2E2E', fontWeight: '600' }}>Discount:</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              style={inputStyle}
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label style={{ color: '#2E2E2E', fontWeight: '600' }}>Status:</label>
            <select
              name="status"
              value={formData.status || 'Unpaid'}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(218, 221, 226, 0.2) 0%, rgba(159, 179, 200, 0.2) 100%)', padding: '1.5rem', borderRadius: '15px', marginBottom: '2rem', border: '2px solid rgba(159, 179, 200, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#2E2E2E', fontWeight: '600' }}>Subtotal:</span>
            <span style={{ color: '#2E2E2E', fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#2E2E2E', fontWeight: '600' }}>Tax ({formData.taxPercentage}%):</span>
            <span style={{ color: '#2E2E2E', fontWeight: '600' }}>${taxAmount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#2E2E2E', fontWeight: '600' }}>Discount:</span>
            <span style={{ color: '#2E2E2E', fontWeight: '600' }}>-${Number(formData.discount || 0).toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', borderTop: '2px solid #9FB3C8', paddingTop: '0.5rem' }}>
            <span style={{ color: '#2E2E2E' }}>Grand Total:</span>
            <span style={{ color: '#2E2E2E' }}>${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button type="submit" style={buttonStyle}>
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
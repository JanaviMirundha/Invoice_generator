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
    margin: '0 auto'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
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
    backgroundColor: '#667eea',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>Create Invoice</h1>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h3>Company Details</h3>
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
            <h3>Client Details</h3>
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
            <label>Invoice Date:</label>
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
            <label>Due Date:</label>
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

        <h3>Items</h3>
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
                style={{ ...buttonStyle, backgroundColor: '#ff4757', padding: '0.5rem' }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addItem}
          style={{ ...buttonStyle, backgroundColor: '#2ed573', marginBottom: '2rem' }}
        >
          Add Item
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label>Tax %:</label>
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
            <label>Discount:</label>
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
            <label>Status:</label>
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

        <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '5px', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Tax ({formData.taxPercentage}%):</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Discount:</span>
            <span>-${Number(formData.discount || 0).toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', borderTop: '2px solid #333', paddingTop: '0.5rem' }}>
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
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
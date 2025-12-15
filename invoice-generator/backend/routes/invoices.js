const express = require('express');
const Invoice = require('../models/Invoice');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate invoice number
const generateInvoiceNumber = () => {
  return 'INV-' + Date.now();
};

// Create invoice
router.post('/', auth, async (req, res) => {
  try {
    const {
      companyName,
      companyAddress,
      clientName,
      clientAddress,
      invoiceDate,
      dueDate,
      items,
      subtotal,
      taxPercentage,
      taxAmount,
      discount,
      grandTotal,
      status
    } = req.body;

    const invoiceData = {
      user: req.user._id,
      invoiceNumber: generateInvoiceNumber(),
      companyName,
      companyAddress,
      clientName,
      clientAddress,
      invoiceDate: new Date(invoiceDate),
      dueDate: new Date(dueDate),
      items,
      subtotal: Number(subtotal),
      taxPercentage: Number(taxPercentage) || 0,
      taxAmount: Number(taxAmount) || 0,
      discount: Number(discount) || 0,
      grandTotal: Number(grandTotal),
      status: status || 'Unpaid'
    };

    const invoice = new Invoice(invoiceData);
    const savedInvoice = await invoice.save();
    
    console.log('✅ Invoice created:', savedInvoice.invoiceNumber);
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error('❌ Invoice creation error:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Get all invoices for user
router.get('/', auth, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single invoice
router.get('/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, user: req.user._id });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update invoice
router.put('/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete invoice
router.delete('/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
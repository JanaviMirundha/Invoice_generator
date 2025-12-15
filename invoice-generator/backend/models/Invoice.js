const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  clientName: { type: String, required: true },
  clientAddress: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  taxPercentage: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Unpaid', 'Pending', 'Overdue'], default: 'Unpaid' }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
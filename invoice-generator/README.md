# Invoice Generator - MERN Stack Application

A complete full-stack invoice generator application built with React.js, Node.js, Express.js, and MongoDB Atlas.

## Features

- 🔐 JWT Authentication (Login/Register)
- 📊 Dashboard to view all invoices
- 📄 Professional invoice creation
- 🧮 Auto-calculation of totals, tax, and discounts
- 🖨️ Print and PDF export functionality
- 📱 Responsive design
- 🎨 Professional UI with smooth animations

## Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Axios
- CSS3 (No external CSS frameworks)

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt for password hashing

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Environment variables are already configured in `.env` file

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Invoices (Protected Routes)
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices` - Get all user invoices
- `GET /api/invoices/:id` - Get single invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

## Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Invoice Schema
```javascript
{
  user: ObjectId (ref: User),
  invoiceNumber: String (unique, auto-generated),
  companyName: String,
  companyAddress: String,
  clientName: String,
  clientAddress: String,
  invoiceDate: Date,
  dueDate: Date,
  items: [{
    name: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  subtotal: Number,
  taxPercentage: Number,
  taxAmount: Number,
  discount: Number,
  grandTotal: Number,
  status: String (Paid/Unpaid),
  timestamps: true
}
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Home Page**: Welcome page with navigation options
3. **Create Invoice**: Fill out the professional invoice form with:
   - Company and client details
   - Dynamic item list
   - Auto-calculated totals
4. **Dashboard**: View all your invoices with options to view, edit, or delete
5. **Invoice Preview**: Professional invoice layout with print/PDF options
6. **About**: Information about the application and technologies used

## Features in Detail

### Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes for invoice operations
- Automatic token management

### Invoice Creation
- Professional form layout
- Dynamic item addition/removal
- Real-time total calculations
- Tax and discount support
- Auto-generated invoice numbers

### Dashboard
- Tabular view of all invoices
- Status indicators (Paid/Unpaid)
- Quick action buttons
- Responsive design

### Invoice Preview
- Clean, professional layout
- Print functionality
- PDF export capability
- Company logo placeholder

## Deployment

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or DigitalOcean
2. Update CORS_ORIGIN in environment variables
3. Ensure MongoDB Atlas is accessible

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or similar platforms
3. Update API_URL in api.js to point to deployed backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.
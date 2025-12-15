# Invoice Generator - Startup Guide

## Quick Start Instructions

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on: http://localhost:3000

### Step 3: Access the Application
Open your browser and go to: http://localhost:3000

## Common Issues & Solutions

### Issue 1: "Module not found" errors
**Solution:** Make sure you've installed all dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Issue 2: Backend connection errors
**Solution:** 
1. Ensure MongoDB Atlas connection string is correct in backend/.env
2. Make sure backend is running on port 5000
3. Check if CORS is properly configured

### Issue 3: Frontend won't start
**Solution:**
1. Delete node_modules and package-lock.json
2. Run `npm install` again
3. Make sure React scripts are properly installed

### Issue 4: Authentication not working
**Solution:**
1. Check if JWT_SECRET is set in backend/.env
2. Ensure backend auth routes are working
3. Check browser console for API errors

## Environment Variables

Make sure your backend/.env file contains:
```
MONGODB_URI=mongodb+srv://janavimirundhasa2024aiml_db_user:Invoice@cluster0.xi0lgsb.mongodb.net/?appName=Cluster0
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
JWT_SECRET=invoice_generator_secret
JWT_EXPIRE=7d
```

## Testing the Application

1. **Register a new user**
2. **Login with credentials**
3. **Create a new invoice**
4. **View dashboard**
5. **Preview and print invoice**

## API Endpoints

- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/invoices - Get all invoices
- POST /api/invoices - Create invoice
- GET /api/invoices/:id - Get single invoice
- PUT /api/invoices/:id - Update invoice
- DELETE /api/invoices/:id - Delete invoice

## Troubleshooting

If you encounter any issues:

1. Check both terminal outputs for error messages
2. Verify MongoDB Atlas connection
3. Ensure both servers are running
4. Check browser console for frontend errors
5. Verify API calls are reaching the backend
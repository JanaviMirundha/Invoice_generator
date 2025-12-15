@echo off
echo Starting Invoice Generator Application...
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
echo.

echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
echo.

echo Setup Complete!
echo.
echo To start the application:
echo 1. Open terminal in 'backend' folder and run: npm run dev
echo 2. Open another terminal in 'frontend' folder and run: npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
pause
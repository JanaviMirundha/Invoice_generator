@echo off
echo Fixing Frontend Issues...
cd frontend

echo Clearing npm cache...
npm cache clean --force

echo Removing node_modules...
rmdir /s /q node_modules

echo Removing package-lock.json...
del package-lock.json

echo Reinstalling dependencies...
npm install

echo Frontend fixed! Try running: npm start
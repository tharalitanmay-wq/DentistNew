@echo off
echo ========================================================
echo   Starting Lumina Dental Studio Full-Stack Platform...
echo ========================================================

echo 1. Ensuring backend node dependencies are installed...
cd /d %~dp0backend
call npm install

echo.
echo 2. Automatically creating & seeding MySQL database 'pearl_dental'...
call npm run seed

echo.
echo 3. Launching Backend REST API Server (Port 5000)...
start "Lumina Backend API (Port 5000)" cmd /k "cd /d %~dp0backend && npm run dev"

echo 4. Launching Frontend Website (Port 3000)...
start "Lumina Frontend Client (Port 3000)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo 5. Launching Admin CMS Dashboard (Port 3001)...
start "Lumina Admin CMS (Port 3001)" cmd /k "cd /d %~dp0admin && npm run dev"

echo ========================================================
echo   ✅ Backend initialized & all 3 services launching:
echo   - Frontend Website:  http://localhost:3000
echo   - Admin CMS Panel:   http://localhost:3001
echo   - Backend REST API:  http://localhost:5000/api/health
echo ========================================================
pause

@echo off
echo ========================================================
echo   Starting Lumina Dental Studio 2-Process Platform...
echo ========================================================

echo 1. Ensuring backend node dependencies are installed...
cd /d %~dp0backend
call npm install

echo.
echo 2. Building Admin CMS export for Backend static hosting...
cd /d %~dp0admin
call npm install
call npm run build

echo.
echo 3. Automatically creating & seeding MySQL database 'pearl_dental'...
cd /d %~dp0backend
call npm run seed

echo.
echo 4. Launching Backend REST API & Admin CMS Server (Port 5000)...
start "Lumina Backend API & Admin CMS (Port 5000)" cmd /k "cd /d %~dp0backend && npm run dev"

echo.
echo 5. Launching Frontend Website Client (Port 3000)...
start "Lumina Frontend Client (Port 3000)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo ========================================================
echo   ✅ 2 Processes Running:
echo   - Frontend Website:  http://localhost:3000
echo   - Backend REST API:  http://localhost:5000/api/health
echo   - Admin CMS Panel:   http://localhost:5000/admin
echo ========================================================
pause

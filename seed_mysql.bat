@echo off
echo ========================================================
echo   Auto-Installing Dependencies & Seeding MySQL Database...
echo ========================================================

cd /d %~dp0backend
call npm install
call npm run seed

echo.
echo ========================================================
echo   Done! Check MySQL Workbench or phpMyAdmin to verify.
echo ========================================================
pause

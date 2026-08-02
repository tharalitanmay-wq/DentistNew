@echo off
echo ===================================================
echo   Pushing Lumina Dental Studio Updates to GitHub...
echo ===================================================
echo.

git add .
git commit -m "Add MySQL database integration, WalkInQueue offline queue tracker, secret 15-char admin gate, and launcher scripts"
git push

echo.
echo ===================================================
echo   Successfully pushed all updates to GitHub repository!
echo ===================================================
pause

@echo off
echo ========================================
echo   Starting SalaryPredictor Project
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.
echo npm version:
npm --version
echo.

REM Start Backend Server
echo ========================================
echo   Starting Backend Server...
echo ========================================
cd backend
start "Backend Server - Port 5001" cmd /k "npm run dev"
cd ..

REM Wait a bit for backend to start
echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

REM Start Frontend Server
echo ========================================
echo   Starting Frontend Server...
echo ========================================
cd frontend
start "Frontend Server - Port 3001" cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo   Project Started Successfully!
echo ========================================
echo.
echo Backend running at: http://localhost:5001
echo Frontend running at: http://localhost:3000
echo.
echo Waiting for servers to fully start...
timeout /t 5 /nobreak >nul

REM Open browser
echo Opening browser...
start http://localhost:3000

echo.
echo To stop the servers, close the terminal windows.
echo.
pause

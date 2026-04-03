@echo off
echo ========================================
echo   SalaryPredictor Project Setup
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

REM Install Backend Dependencies
echo ========================================
echo   Installing Backend Dependencies...
echo ========================================
cd backend
if exist package.json (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install backend dependencies
        cd ..
        pause
        exit /b 1
    )
    echo Backend dependencies installed successfully!
) else (
    echo WARNING: backend/package.json not found
)
cd ..
echo.

REM Install Frontend Dependencies
echo ========================================
echo   Installing Frontend Dependencies...
echo ========================================
cd frontend
if exist package.json (
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install frontend dependencies
        cd ..
        pause
        exit /b 1
    )
    echo Frontend dependencies installed successfully!
) else (
    echo WARNING: frontend/package.json not found
)
cd ..
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure your .env files in backend folder
echo 2. Run 'start-project.bat' to start the application
echo.
pause

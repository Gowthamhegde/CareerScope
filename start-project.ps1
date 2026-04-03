# PowerShell script to start SalaryPredictor project
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting SalaryPredictor Project" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Start Backend Server
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Backend Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev"

# Wait for backend to start
Start-Sleep -Seconds 3

# Start Frontend Server
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Frontend Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

# Wait for frontend to start
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Project Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend running at: http://localhost:5001" -ForegroundColor Yellow
Write-Host "Frontend running at: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Cyan

# Open browser
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "To stop the servers, close the PowerShell windows." -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit this window"

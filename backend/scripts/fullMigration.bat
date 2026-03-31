@echo off
echo 🚀 Complete Supabase Migration Script
echo ======================================
echo.

REM Check if we're in the backend directory
if not exist "package.json" (
    echo ❌ Please run this script from the backend directory
    exit /b 1
)

REM Step 1: Install dependencies
echo 📦 Step 1: Installing dependencies...
call npm install @supabase/supabase-js
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✅ Dependencies installed
echo.

REM Step 2: Setup Supabase credentials
echo 📝 Step 2: Supabase Setup
node scripts/setupSupabase.js
if errorlevel 1 (
    echo ❌ Setup failed
    exit /b 1
)

echo.
echo ✅ Migration complete!
echo.
echo Next steps:
echo 1. Update your server.js to use Supabase models
echo 2. Test your API endpoints
echo 3. Update frontend API calls if needed

pause

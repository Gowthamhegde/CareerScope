#!/bin/bash

echo "🚀 Complete Supabase Migration Script"
echo "======================================"
echo ""

# Check if we're in the backend directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install @supabase/supabase-js
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Step 2: Setup Supabase credentials
echo "📝 Step 2: Supabase Setup"
node scripts/setupSupabase.js
if [ $? -ne 0 ]; then
    echo "❌ Setup failed"
    exit 1
fi

echo ""
echo "✅ Migration complete!"
echo ""
echo "Next steps:"
echo "1. Update your server.js to use Supabase models"
echo "2. Test your API endpoints"
echo "3. Update frontend API calls if needed"

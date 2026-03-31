# Supabase Migration Guide

## Quick Start (Automated)

### For Windows (CMD):
```cmd
cd backend
scripts\fullMigration.bat
```

### For Linux/Mac:
```bash
cd backend
chmod +x scripts/fullMigration.sh
./scripts/fullMigration.sh
```

## Manual Step-by-Step

### 1. Install Dependencies
```bash
cd backend
npm install @supabase/supabase-js
```

### 2. Get Supabase Credentials
1. Go to https://supabase.com
2. Create a new project (or use existing)
3. Go to Settings → API
4. Copy your:
   - Project URL
   - Anon/Public Key

### 3. Run Setup Script
```bash
node scripts/setupSupabase.js
```

This will:
- Prompt for your Supabase credentials
- Update your `.env` file
- Install dependencies
- Guide you through SQL setup

### 4. Apply Database Schema

**Option A: Manual (Recommended)**
1. Go to https://supabase.com/dashboard/project/_/sql
2. Open `backend/supabase-schema.sql`
3. Copy and paste the entire content
4. Click "Run"
5. Repeat for `backend/supabase-functions.sql`

**Option B: Test Connection**
```bash
node scripts/applySchema.js
```

### 5. Migrate Data
```bash
node scripts/migrateToSupabase.js
```

This will:
- Connect to your MongoDB
- Fetch all jobs
- Transform the data
- Insert into Supabase
- Verify the migration

### 6. Verify Migration
```bash
node scripts/verifyData.js
```

## What Gets Migrated

- ✅ All job records from MongoDB
- ✅ Job titles, salaries, experience levels
- ✅ Company information
- ✅ Skills and categories
- ✅ Location data

## After Migration

### Update Your Code
The following files have already been updated to use Supabase:
- ✅ `backend/models/SupabaseJob.js` (new model)
- ✅ `backend/controllers/jobController.js`
- ✅ `backend/controllers/salaryController.js`
- ✅ `backend/config/supabase.js`

### Test Your API
```bash
# Start your server
npm start

# Test endpoints
curl http://localhost:5001/api/jobs
curl http://localhost:5001/api/jobs/stats
```

## Troubleshooting

### "Missing Supabase credentials"
- Make sure you ran `setupSupabase.js`
- Check that `backend/.env` has `SUPABASE_URL` and `SUPABASE_ANON_KEY`

### "Table 'jobs' does not exist"
- Run the SQL files manually in Supabase Dashboard
- Make sure both `supabase-schema.sql` and `supabase-functions.sql` were executed

### "Migration failed"
- Check your MongoDB connection
- Verify Supabase credentials
- Check Supabase dashboard for errors

### "No jobs to migrate"
- Make sure your MongoDB has data
- Check MongoDB connection string in `.env`

## Rollback

If you need to rollback:
1. Keep your MongoDB connection in `.env`
2. Switch back to using `Job` model instead of `SupabaseJob`
3. Revert controller changes

## Benefits of Supabase

- 🚀 Faster queries with PostgreSQL
- 📊 Built-in analytics
- 🔒 Row-level security
- 🌐 Auto-generated REST API
- 💾 Real-time subscriptions
- 🆓 Generous free tier

## Need Help?

Check the logs during migration for detailed error messages.

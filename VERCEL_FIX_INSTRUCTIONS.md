# Fix Vercel Deployment Issue

## Problem
The Vercel project `salarypredictor` has an incorrect Root Directory setting pointing to `frontend/frontend` instead of `.` (current directory).

## Solution

### Option 1: Fix via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/gowthamhegdes-projects/salarypredictor/settings
2. Scroll to "Root Directory"
3. Change from `frontend` to `.` (dot - meaning current directory)
4. Click "Save"
5. Then redeploy:
   ```bash
   cd frontend
   vercel --prod
   ```

### Option 2: Deploy to New Project

If you want to start fresh:

1. Delete the old project from Vercel dashboard
2. Deploy fresh:
   ```bash
   cd frontend
   vercel --prod
   ```
3. When prompted:
   - Link to existing project? **No**
   - Project name: **salarypredictor** (or new name)
   - Root directory: **. (current directory)**
   - Build settings: Use detected settings

### Option 3: Use Git Integration (Best for Production)

1. Push your code to GitHub
2. Go to Vercel dashboard
3. Import your repository
4. Configure:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables:
     - `VITE_API_URL` = `https://careerscope-4vvf.onrender.com/api`

## Current Setup

### Working URLs
- **Frontend**: https://salarypredictor.vercel.app (needs redeploy with correct env)
- **Backend**: https://careerscope-4vvf.onrender.com/api ✅
- **Database**: Supabase ✅

### Environment Variables Needed
```
VITE_API_URL=https://careerscope-4vvf.onrender.com/api
```

## Verify After Fix

Test the deployment:
```bash
# Test frontend
curl https://salarypredictor.vercel.app

# Test API connection from frontend
# Open browser console on https://salarypredictor.vercel.app
# Check if API calls are going to the correct backend
```

## Quick Test Commands

```bash
# Test backend is working
curl https://careerscope-4vvf.onrender.com/api/health

# Test backend stats
curl https://careerscope-4vvf.onrender.com/api/jobs/stats

# Test frontend loads
curl -I https://salarypredictor.vercel.app
```

## Alternative: Deploy from Root

If the issue persists, you can deploy from the project root:

1. Create `vercel.json` in project root:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

2. Deploy from root:
```bash
cd ..  # Go to project root
vercel --prod
```

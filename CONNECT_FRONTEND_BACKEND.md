# Connect Frontend & Backend

## Your URLs
- **Frontend**: https://currierscope.vercel.app/
- **Backend**: https://careerscope-4vvf.onrender.com

## Step 1: Add Backend URL to Vercel

### Option A: Using Vercel Dashboard (Easiest)
1. Go to https://vercel.com/dashboard
2. Click on your project: **currierscope**
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://careerscope-4vvf.onrender.com/api`
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**
6. Go to **Deployments** tab
7. Click the **...** menu on the latest deployment
8. Click **Redeploy**

### Option B: Using Vercel CLI
```bash
cd frontend
vercel env add VITE_API_URL production
# When prompted, enter: https://careerscope-4vvf.onrender.com/api

vercel --prod
```

## Step 2: Add Frontend URL to Render Backend

1. Go to https://dashboard.render.com/
2. Click on your backend service: **careerscope-4vvf**
3. Go to **Environment** tab
4. Add new variable (or update if exists):
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://currierscope.vercel.app`
5. Click **Save Changes**
6. Render will automatically redeploy

## Step 3: Test the Connection

### Test Backend
```bash
curl https://careerscope-4vvf.onrender.com/api/health
```

Should return:
```json
{"success":true,"message":"CareerScope API is running"}
```

### Test Jobs API
```bash
curl https://careerscope-4vvf.onrender.com/api/jobs?limit=3
```

Should return job data with 202 jobs.

### Test Frontend
1. Visit: https://currierscope.vercel.app/
2. Check browser console (F12) for any errors
3. Navigate to different pages
4. Verify jobs are loading

## Troubleshooting

### If you see "Network Error" on frontend:
- Wait 2-3 minutes for both deployments to complete
- Check browser console for CORS errors
- Verify environment variables are set correctly

### If CORS error appears:
- Make sure `FRONTEND_URL` is set in Render backend
- Restart backend service in Render
- Clear browser cache and reload

### If jobs don't load:
- Test backend API directly (curl commands above)
- Check Render logs for backend errors
- Verify MongoDB connection in Render logs

## Expected Result

After both redeployments complete (3-5 minutes):
- ✅ Frontend loads at https://currierscope.vercel.app/
- ✅ Jobs are displayed from MongoDB Atlas
- ✅ All 202 jobs are accessible
- ✅ Salary calculator works
- ✅ All pages function correctly

## Quick Commands

```bash
# Redeploy frontend with new env var
cd frontend
vercel --prod

# Test backend
curl https://careerscope-4vvf.onrender.com/api/health
curl https://careerscope-4vvf.onrender.com/api/jobs/stats
```

## Status Checklist
- [ ] VITE_API_URL added to Vercel
- [ ] Frontend redeployed on Vercel
- [ ] FRONTEND_URL added to Render backend
- [ ] Backend redeployed on Render
- [ ] Backend health check passes
- [ ] Frontend loads and shows jobs

# 🚀 Complete Deployment Plan - CareerScope with Data

## Overview
We'll deploy:
1. **MongoDB Atlas** (Free Cloud Database) - Stores all job data
2. **Render.com Backend** (Free) - API server
3. **Vercel Frontend** (Free) - React app

Total Time: ~20 minutes
Total Cost: $0 (All free tiers)

---

## Phase 1: Database Setup (5 minutes)

### Step 1.1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/Email
3. Choose **FREE M0 Cluster**
4. Select **AWS** provider, **Mumbai (ap-south-1)** region
5. Cluster Name: `careerscope-cluster`
6. Click **Create Cluster**

### Step 1.2: Configure Database Access
1. Click **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Username: `careerscope_admin`
4. Password: Generate secure password (SAVE THIS!)
5. Database User Privileges: **Read and write to any database**
6. Click **Add User**

### Step 1.3: Configure Network Access
1. Click **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### Step 1.4: Get Connection String
1. Click **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://careerscope_admin:<password>@careerscope-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. **SAVE THIS CONNECTION STRING!**

---

## Phase 2: Backend Deployment (7 minutes)

### Step 2.1: Prepare Backend for Deployment
Already done! Your backend is ready.

### Step 2.2: Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub (recommended) or Email

### Step 2.3: Deploy Backend to Render
1. Click **New +** → **Web Service**
2. Choose **Build and deploy from a Git repository**
3. Connect your GitHub account OR use **Public Git Repository**
4. If using public repo, enter: `https://github.com/YOUR_USERNAME/careerscope`
   - OR click **Deploy without Git** and we'll upload manually

### Step 2.4: Configure Backend Service
- **Name**: `careerscope-api`
- **Region**: Singapore (closest to India)
- **Branch**: main
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free

### Step 2.5: Add Environment Variables
Click **Advanced** → **Add Environment Variable**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5001` |
| `MONGODB_URI` | `YOUR_MONGODB_ATLAS_CONNECTION_STRING` |
| `CORS_ORIGIN` | `https://currierscope.vercel.app` |

Click **Create Web Service**

### Step 2.6: Wait for Deployment
- Wait 3-5 minutes for build
- Once deployed, copy your backend URL (looks like):
  ```
  https://careerscope-api.onrender.com
  ```

### Step 2.7: Seed Database with Data
1. Go to Render dashboard
2. Click on your service
3. Click **Shell** tab
4. Run these commands:
   ```bash
   cd backend
   node scripts/seedData.js
   node scripts/importData.js
   ```
5. You should see: "✅ Seeded 2000 jobs" and "✅ Data imported successfully!"

---

## Phase 3: Frontend Deployment (5 minutes)

### Step 3.1: Update Frontend API URL
We need to update the frontend to use the deployed backend.

### Step 3.2: Update Environment Variables
Create/update `frontend/.env.production`:
```env
VITE_API_URL=https://careerscope-api.onrender.com/api
```

### Step 3.3: Redeploy to Vercel
Run from frontend directory:
```bash
npm run build
vercel --prod
```

Or update via Vercel dashboard:
1. Go to: https://vercel.com/dashboard
2. Click on `currierscope` project
3. Go to **Settings** → **Environment Variables**
4. Add: `VITE_API_URL` = `https://careerscope-api.onrender.com/api`
5. Go to **Deployments** → Click **...** → **Redeploy**

---

## Phase 4: Verification (3 minutes)

### Step 4.1: Test Backend API
Open in browser:
```
https://careerscope-api.onrender.com/api/jobs?limit=5
```
Should return JSON with job data.

### Step 4.2: Test Frontend
Open in browser:
```
https://currierscope.vercel.app
```
Should show:
- ✅ Job listings with real data
- ✅ Stats showing 180+ jobs
- ✅ All features working

### Step 4.3: Test All Features
- [ ] Home page loads with stats
- [ ] Job Explorer shows jobs
- [ ] Salary Predictor works
- [ ] City Comparison works
- [ ] Skills Analysis works
- [ ] Dashboard shows data

---

## 🎉 Final URLs to Share with Client

**Live Website**: https://currierscope.vercel.app
**API Endpoint**: https://careerscope-api.onrender.com/api

---

## 📊 Data Included

- ✅ 180+ real job records from CSV
- ✅ 10 job categories
- ✅ Salary data in USD and INR
- ✅ Experience levels (Entry, Mid, Senior, Executive)
- ✅ Company sizes and locations
- ✅ Remote work ratios

---

## ⚠️ Important Notes

1. **Render Free Tier**: Backend may sleep after 15 min of inactivity. First request takes 30-60 seconds to wake up.
2. **MongoDB Atlas Free Tier**: 512MB storage (enough for ~50K jobs)
3. **Vercel Free Tier**: Unlimited bandwidth for personal projects

---

## 🔧 Troubleshooting

**Backend not responding?**
- Check Render logs: Dashboard → Service → Logs
- Verify MongoDB connection string is correct
- Check environment variables are set

**Frontend shows no data?**
- Check browser console for errors
- Verify VITE_API_URL is correct
- Check CORS settings in backend

**Database empty?**
- Re-run seed scripts from Render Shell
- Check MongoDB Atlas → Browse Collections

---

## 🚀 Next Steps After Deployment

1. Share URL with client: https://currierscope.vercel.app
2. Monitor usage in Render dashboard
3. Check MongoDB Atlas for data storage
4. Consider upgrading to paid tiers for production use

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | M0 Free | $0/month |
| Render Backend | Free | $0/month |
| Vercel Frontend | Hobby | $0/month |
| **TOTAL** | | **$0/month** |

For production with better performance:
- Render: $7/month (no sleep)
- MongoDB Atlas: $9/month (more storage)
- Vercel: Free (sufficient)
- **Total**: ~$16/month

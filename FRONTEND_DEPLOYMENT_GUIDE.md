# Frontend Deployment Guide

## Prerequisites
✅ Backend deployed on Render
✅ Backend URL (e.g., https://careerscope-backend.onrender.com)

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Update Environment Variable
Edit `frontend/.env.production` and replace `YOUR_BACKEND_URL` with your actual Render backend URL:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Step 3: Deploy
```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **careerscope** (or your choice)
- Directory? **./frontend** or **./** (if already in frontend folder)
- Override settings? **N**

### Step 4: Set Environment Variable in Vercel
After first deployment:
```bash
vercel env add VITE_API_URL
```
Enter your backend URL: `https://your-backend.onrender.com/api`
Select: **Production**

### Step 5: Deploy to Production
```bash
vercel --prod
```

Your frontend will be live at: `https://your-project.vercel.app`

---

## Option 2: Deploy to Render (Static Site)

### Step 1: Push to GitHub
Make sure your code is on GitHub.

### Step 2: Create New Static Site on Render
1. Go to https://dashboard.render.com/
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name**: careerscope-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist

### Step 3: Add Environment Variable
In Render dashboard:
- Click "Environment" tab
- Add variable:
  - **Key**: `VITE_API_URL`
  - **Value**: `https://your-backend.onrender.com/api`

### Step 4: Deploy
Click "Create Static Site" - Render will build and deploy.

Your frontend will be live at: `https://careerscope-frontend.onrender.com`

---

## Option 3: Deploy to Netlify

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build the Project
```bash
cd frontend
npm run build
```

### Step 3: Deploy
```bash
netlify deploy --prod
```

Follow prompts:
- Create & configure a new site? **Y**
- Team? Select your team
- Site name? **careerscope** (or your choice)
- Publish directory? **dist**

### Step 4: Set Environment Variable
```bash
netlify env:set VITE_API_URL "https://your-backend.onrender.com/api"
```

Then redeploy:
```bash
netlify deploy --prod
```

---

## Update Backend CORS

After deploying frontend, update your backend to allow requests from your frontend URL.

In `backend/server.js`, the CORS is already configured, but make sure to add your frontend URL to Render environment variables:

**In Render Backend Dashboard:**
- Add environment variable:
  - **Key**: `FRONTEND_URL`
  - **Value**: `https://your-frontend.vercel.app` (or your actual frontend URL)

---

## Testing Deployment

### 1. Test Backend First
```bash
curl https://your-backend.onrender.com/api/health
```

Should return:
```json
{"success":true,"message":"CareerScope API is running"}
```

### 2. Test Jobs Endpoint
```bash
curl https://your-backend.onrender.com/api/jobs?limit=5
```

Should return job data.

### 3. Test Frontend
Visit your frontend URL and check:
- Home page loads
- Job listings appear
- Salary calculator works
- All pages navigate correctly

---

## Quick Deployment (Vercel - Fastest)

If you want the absolute fastest deployment:

```bash
# 1. Update the backend URL
echo "VITE_API_URL=https://your-backend.onrender.com/api" > frontend/.env.production

# 2. Deploy
cd frontend
npx vercel --prod
```

Done! Your app will be live in 2-3 minutes.

---

## Environment Variables Summary

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Backend (Render Dashboard)
```
MONGO_URI=mongodb+srv://...
NODE_ENV=production
PORT=5001
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## Troubleshooting

### Frontend shows "Network Error"
- Check VITE_API_URL is correct
- Verify backend is running
- Check browser console for CORS errors

### CORS Error
- Add FRONTEND_URL to backend environment variables
- Restart backend service

### Build Fails
- Run `npm install` in frontend folder
- Check for any missing dependencies
- Verify Node.js version (should be 18+)

### Environment Variable Not Working
- Make sure it starts with `VITE_`
- Rebuild after changing env vars
- Clear cache: `rm -rf dist node_modules/.vite`

---

## Recommended: Vercel

Vercel is the easiest and fastest option for React/Vite apps:
- ✅ Automatic deployments from Git
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Instant rollbacks

Just run: `npx vercel --prod` and you're done!

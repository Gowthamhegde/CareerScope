# Fix Render Deployment - Environment Variables

## Problem
Your Render deployment is failing with:
```
Database connection error: The `uri` parameter to `openUri()` must be a string, got "undefined"
```

This means the `MONGO_URI` environment variable is not set on Render.

## Solution: Add Environment Variables to Render

### Step 1: Go to Render Dashboard
1. Login to https://dashboard.render.com/
2. Find your backend service (careerscope-backend or similar)
3. Click on the service name

### Step 2: Add Environment Variables
1. Click on "Environment" in the left sidebar
2. Click "Add Environment Variable"
3. Add these variables:

**Variable 1:**
- Key: `MONGO_URI`
- Value: `mongodb+srv://gowthamhegde04:7760190064%40Gow@careerscope-cluster.yj9jdyv.mongodb.net/careerscope_db?retryWrites=true&w=majority&appName=careerscope-cluster`

**Variable 2:**
- Key: `NODE_ENV`
- Value: `production`

**Variable 3:**
- Key: `PORT`
- Value: `5001`

**Variable 4 (Optional but recommended):**
- Key: `FRONTEND_URL`
- Value: `https://your-frontend-url.vercel.app` (replace with your actual frontend URL)

### Step 3: Save and Redeploy
1. Click "Save Changes"
2. Render will automatically redeploy your service
3. Wait for the deployment to complete

## Alternative: Use Render.yaml (Recommended for Future)

Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: careerscope-backend
    env: node
    region: oregon
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5001
      - key: MONGO_URI
        sync: false  # This means you'll set it manually in dashboard (for security)
      - key: FRONTEND_URL
        sync: false
```

## Security Note
⚠️ **Never commit `.env` files to Git!**

Your `.env` file should be in `.gitignore`. Environment variables for production should be set in:
- Render Dashboard (for backend)
- Vercel Dashboard (for frontend)

## Verify After Deployment

Once deployed, check:
1. Render logs should show: `MongoDB Connected: ac-fqng8ug-shard-00-00.yj9jdyv.mongodb.net`
2. Health endpoint: `https://your-backend-url.onrender.com/api/health`
3. Jobs endpoint: `https://your-backend-url.onrender.com/api/jobs`

## Current Status
✅ Local development: Working (202 jobs in database)
❌ Render deployment: Needs environment variables
✅ MongoDB Atlas: Connected and populated with data

## Quick Checklist
- [ ] Login to Render Dashboard
- [ ] Navigate to your backend service
- [ ] Click "Environment" tab
- [ ] Add MONGO_URI variable
- [ ] Add NODE_ENV=production
- [ ] Save changes
- [ ] Wait for automatic redeploy
- [ ] Check logs for "MongoDB Connected"
- [ ] Test health endpoint

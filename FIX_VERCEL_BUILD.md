# Fix Vercel Build Error

## Problem
Vercel build failing with: `vite: command not found`

## Root Cause
Vercel is not installing dependencies or not finding the correct directory.

## Solution 1: Update Vercel Project Settings (Recommended)

### Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Click your project: **currierscope**
3. Go to **Settings** → **General**

### Update Build & Development Settings
Set these values:

**Framework Preset:**
- Select: **Vite**

**Root Directory:**
- Set to: `frontend` (if your frontend is in a subdirectory)
- Or leave as `./` if frontend is at root

**Build Command:**
```
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```
npm install
```

### Save and Redeploy
1. Click **Save**
2. Go to **Deployments** tab
3. Click **...** on latest deployment
4. Click **Redeploy**

---

## Solution 2: Use Updated vercel.json

I've updated `frontend/vercel.json` with proper build settings.

Push the changes:
```bash
git add frontend/vercel.json
git commit -m "Fix Vercel build configuration"
git push origin main
```

Vercel will auto-redeploy.

---

## Solution 3: Deploy from Frontend Directory

If your project structure is:
```
project/
├── backend/
└── frontend/
```

You need to tell Vercel to use the `frontend` directory:

### Option A: Vercel Dashboard
1. Settings → General
2. Root Directory: `frontend`
3. Save and redeploy

### Option B: Deploy from CLI
```bash
cd frontend
vercel --prod
```

---

## Solution 4: Manual Deployment (Quick Fix)

If you need it working NOW:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Build locally
npm run build

# Deploy the dist folder
cd dist
vercel --prod
```

---

## Verify Package.json

Make sure `frontend/package.json` has the build script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Common Issues & Solutions

### Issue 1: "Cannot find module 'vite'"
**Solution:** Vite not installed
```bash
cd frontend
npm install vite --save-dev
```

### Issue 2: "Root directory not found"
**Solution:** Set correct root directory in Vercel settings
- If frontend is in subdirectory: Set to `frontend`
- If frontend is at root: Leave as `./`

### Issue 3: "Build command failed"
**Solution:** Check build command in Vercel settings
- Should be: `npm run build` or `npm install && npm run build`

### Issue 4: "Output directory not found"
**Solution:** Set output directory to `dist` (Vite's default)

---

## Recommended Vercel Configuration

### For Monorepo (backend + frontend folders):

**In Vercel Dashboard:**
- Root Directory: `frontend`
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
- `VITE_API_URL`: `https://careerscope-4vvf.onrender.com/api`

### For Frontend-Only Repo:

**In Vercel Dashboard:**
- Root Directory: `./`
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

---

## Quick Fix Steps

1. **Go to Vercel Dashboard**
2. **Settings → General**
3. **Set Root Directory to `frontend`**
4. **Set Framework to `Vite`**
5. **Save**
6. **Deployments → Redeploy**

---

## Test After Fix

Once deployment succeeds:
1. Visit: https://currierscope.vercel.app/
2. Check if site loads
3. Open console (F12)
4. Verify no build errors
5. Check if jobs load from backend

---

## Alternative: Create New Vercel Project

If settings don't work, create a fresh deployment:

```bash
cd frontend
vercel --prod
```

Follow prompts:
- Link to existing project? **N**
- Project name: **currierscope-new**
- Directory: **./frontend** or **./** (if already in frontend)

Then update DNS/domain if needed.

---

## Expected Build Output

Successful build should show:
```
✓ Building...
✓ Compiled successfully
✓ Uploading...
✓ Deployment ready
```

Failed build shows:
```
✗ Build failed
sh: vite: command not found
```

---

## Current Status

- ✅ Updated `frontend/vercel.json` with build config
- ⏳ Need to push changes or update Vercel settings
- ⏳ Need to redeploy

## Next Steps

1. Choose a solution above (recommend Solution 1)
2. Apply the fix
3. Wait for deployment (2-3 minutes)
4. Test: https://currierscope.vercel.app/

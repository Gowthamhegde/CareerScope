# Vercel Build Error Fix Guide

## Common Build Errors & Solutions

### 1. Root Directory Error
**Error**: "The provided path does not exist"

**Fix**:
1. Go to: https://vercel.com/gowthamhegdes-projects/salarypredictor/settings/general
2. Find "Root Directory"
3. Set it to: `.` (just a dot, meaning current directory)
4. Click Save

### 2. Build Command Error
**Error**: "Command failed" or "npm run build failed"

**Fix in Vercel Dashboard**:
1. Go to: https://vercel.com/gowthamhegdes-projects/salarypredictor/settings/general
2. Build & Development Settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Environment Variable Missing
**Error**: API calls failing or undefined variables

**Fix**:
1. Go to: https://vercel.com/gowthamhegdes-projects/salarypredictor/settings/environment-variables
2. Add:
   - Name: `VITE_API_URL`
   - Value: `https://careerscope-4vvf.onrender.com/api`
   - Environment: Production, Preview, Development (check all)
3. Click Save

### 4. Node Version Error
**Error**: "Node version not supported"

**Fix**: Already added `.node-version` file with Node 18

### 5. Module Not Found Error
**Error**: "Cannot find module" or "Module not found"

**Fix**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

Then commit and push changes.

## Quick Deployment Steps

### Option A: Via Vercel Dashboard (Easiest)

1. **Update Settings**:
   - Root Directory: `.`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: Vite

2. **Add Environment Variable**:
   - `VITE_API_URL` = `https://careerscope-4vvf.onrender.com/api`

3. **Redeploy**:
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment

### Option B: Via Git Push

1. Commit your changes:
```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push
```

2. Vercel will auto-deploy

### Option C: Via CLI (if settings are correct)

```bash
cd frontend
vercel --prod
```

## Verify Build Locally First

Before deploying, always test locally:

```bash
cd frontend
npm install
npm run build
npm run preview
```

If this works, the build should work on Vercel.

## Check Build Logs

If build still fails:

1. Go to: https://vercel.com/gowthamhegdes-projects/salarypredictor
2. Click on the failed deployment
3. Click "View Build Logs"
4. Look for the specific error message
5. Share the error for specific help

## Common Error Messages & Fixes

### "ENOENT: no such file or directory"
- Check Root Directory is set to `.`
- Make sure all files are committed to Git

### "Module not found: Can't resolve"
- Missing dependency in package.json
- Run `npm install <missing-package>`

### "Process exited with code 1"
- Check build logs for specific error
- Usually a syntax error or missing import

### "Failed to compile"
- ESLint or TypeScript errors
- Check the specific file mentioned in logs

## Current Working Configuration

### package.json scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### vercel.json:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Environment Variables:
- `VITE_API_URL`: https://careerscope-4vvf.onrender.com/api

## Test After Deployment

```bash
# Test if site loads
curl -I https://salarypredictor.vercel.app

# Test if API connection works
# Open browser console at https://salarypredictor.vercel.app
# Check Network tab for API calls
```

## Still Having Issues?

Share the exact error message from Vercel build logs, and I can provide specific help!

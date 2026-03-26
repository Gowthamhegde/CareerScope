# Fix CORS Issue - Connect Frontend to Backend

## Problem
Frontend can't fetch data from backend due to CORS (Cross-Origin Resource Sharing) restrictions.

## Solution Applied
Updated `backend/server.js` to allow requests from your Vercel frontend.

## Deploy the Fix

### Option 1: Push to Git (If using Git deployment on Render)
```bash
git add backend/server.js
git commit -m "Fix CORS to allow Vercel frontend"
git push origin main
```
Render will automatically redeploy.

### Option 2: Manual Deploy on Render
1. Go to https://dashboard.render.com/
2. Click your backend service
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait 2-3 minutes

### Option 3: Quick Test Without Redeploying
Add this environment variable to Render:
- **Key**: `FRONTEND_URL`
- **Value**: `https://currierscope.vercel.app`

Then redeploy.

## Verify Backend CORS

Test if backend allows your frontend:
```bash
curl -H "Origin: https://currierscope.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://careerscope-4vvf.onrender.com/api/health
```

Should return headers including:
```
Access-Control-Allow-Origin: https://currierscope.vercel.app
```

## Test Frontend Connection

After backend redeploys:

1. Visit: https://currierscope.vercel.app/
2. Open browser console (F12)
3. Check Network tab
4. Look for API calls to `careerscope-4vvf.onrender.com`
5. Should see 200 OK responses

## Common CORS Errors

### Error: "No 'Access-Control-Allow-Origin' header"
**Solution:** Backend CORS not configured
- Make sure FRONTEND_URL is set in Render
- Redeploy backend after updating server.js

### Error: "CORS policy: credentials mode is 'include'"
**Solution:** Backend needs credentials: true
- Already fixed in the updated server.js

### Error: "Preflight request didn't succeed"
**Solution:** Backend not responding to OPTIONS requests
- Already fixed in the updated server.js

## Debugging Steps

### 1. Check Backend is Running
```bash
curl https://careerscope-4vvf.onrender.com/api/health
```

### 2. Check Frontend Environment Variable
In Vercel dashboard:
- Settings → Environment Variables
- Verify: `VITE_API_URL = https://careerscope-4vvf.onrender.com/api`

### 3. Check Browser Console
Open https://currierscope.vercel.app/ and press F12:
- Look for red errors
- Check Network tab for failed requests
- Look for CORS-related error messages

### 4. Check Render Logs
In Render dashboard:
- Click your backend service
- Go to Logs tab
- Look for incoming requests from your frontend

## Alternative: Temporary Fix (Allow All Origins)

If you need a quick fix, you can temporarily allow all origins:

In Render environment variables, add:
- **Key**: `CORS_ORIGIN`
- **Value**: `*`

Then update `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
```

**Note:** This is less secure but good for testing.

## Expected Behavior After Fix

✅ Frontend loads without errors
✅ Jobs are displayed
✅ API calls succeed (check Network tab)
✅ No CORS errors in console
✅ All pages work correctly

## Next Steps

1. Push updated server.js to Git (or manually deploy on Render)
2. Wait 2-3 minutes for Render to redeploy
3. Test frontend: https://currierscope.vercel.app/
4. Check browser console for errors
5. Verify jobs are loading

## If Still Not Working

Check these in order:
1. ✅ Backend is running (test health endpoint)
2. ✅ VITE_API_URL is set in Vercel
3. ✅ Frontend is redeployed after adding env var
4. ✅ Backend has FRONTEND_URL set
5. ✅ Backend is redeployed with new CORS config
6. ✅ No errors in Render logs
7. ✅ No errors in browser console

## Quick Test Command

Test if everything is connected:
```bash
# Test backend
curl https://careerscope-4vvf.onrender.com/api/jobs?limit=1

# Should return job data
```

Then visit your frontend and check if jobs load.

# Complete Setup Checklist - Fix Render Backend

## Current Issue
Backend on Render keeps crashing because it can't connect to MongoDB Atlas.

## Complete Fix Steps

### 1. MongoDB Atlas - Network Access (CRITICAL)
**This is the main issue - do this first!**

1. Go to https://cloud.mongodb.com/
2. Login and select your project
3. Click **"Network Access"** in left sidebar (under Security section)
4. Look for existing IP addresses
5. Click **"+ ADD IP ADDRESS"** button
6. Click **"ALLOW ACCESS FROM ANYWHERE"**
7. It will show: `0.0.0.0/0` (CIDR)
8. Add comment: "Render deployment"
9. Click **"Confirm"**
10. **WAIT 2-3 MINUTES** for status to show "Active"

### 2. Verify MongoDB Atlas Settings

Check these in MongoDB Atlas:

**Database Access (Users):**
- Username: `gowthamhegde04`
- Password: `7760190064@Gow`
- Role: Atlas Admin or Read/Write to any database
- Status: Active ✅

**Network Access:**
- Should show: `0.0.0.0/0` with status "Active" ✅

### 3. Verify Render Environment Variables

Go to https://dashboard.render.com/ → Your backend service → Environment tab

**Required variables:**
```
MONGO_URI=mongodb+srv://gowthamhegde04:7760190064%40Gow@careerscope-cluster.yj9jdyv.mongodb.net/careerscope_db?retryWrites=true&w=majority&appName=careerscope-cluster

NODE_ENV=production

PORT=5001

FRONTEND_URL=https://currierscope.vercel.app
```

**Important:** The `%40` in the MONGO_URI is the URL-encoded version of `@` in your password.

### 4. Manual Redeploy on Render

After fixing MongoDB Atlas:
1. Go to Render dashboard
2. Click your backend service
3. Click **"Manual Deploy"** button
4. Select **"Deploy latest commit"**
5. Wait 2-3 minutes for deployment

### 5. Check Render Logs

While deploying, watch the logs:
1. Click on your service
2. Click **"Logs"** tab
3. Look for these messages:

**Success looks like:**
```
🚀 CareerScope API server running on port 5001
📊 Environment: production
MongoDB Connected: ac-fqng8ug-shard-00-00.yj9jdyv.mongodb.net
```

**Failure looks like:**
```
Database connection error: Could not connect to any servers
```

### 6. Test Backend

Once logs show "MongoDB Connected", test:

**Using browser:**
Visit: https://careerscope-4vvf.onrender.com/api/health

**Using PowerShell:**
```powershell
Invoke-WebRequest -Uri "https://careerscope-4vvf.onrender.com/api/health" -UseBasicParsing
```

**Expected response:**
```json
{"success":true,"message":"CareerScope API is running","timestamp":"..."}
```

## Common Issues & Solutions

### Issue 1: "Could not connect to any servers"
**Solution:** MongoDB Atlas IP not whitelisted
- Go to Atlas → Network Access
- Add 0.0.0.0/0
- Wait 2-3 minutes
- Redeploy on Render

### Issue 2: "Authentication failed"
**Solution:** Wrong password in MONGO_URI
- Check password has `%40` instead of `@`
- Verify username/password in Atlas Database Access

### Issue 3: "uri parameter must be a string, got undefined"
**Solution:** MONGO_URI not set in Render
- Go to Render → Environment
- Add MONGO_URI variable
- Save and redeploy

### Issue 4: Backend keeps restarting
**Solution:** Check Render logs for specific error
- Usually MongoDB connection issue
- Fix MongoDB Atlas settings first
- Then redeploy

## Verification Checklist

Before testing, verify:
- [ ] MongoDB Atlas Network Access shows 0.0.0.0/0 as "Active"
- [ ] MongoDB Atlas Database Access shows your user as "Active"
- [ ] Render environment has MONGO_URI set correctly
- [ ] Render environment has NODE_ENV=production
- [ ] Waited 2-3 minutes after changing Atlas settings
- [ ] Manually redeployed on Render
- [ ] Render logs show "MongoDB Connected"

## If Still Not Working

1. **Check MongoDB Atlas Connection String:**
   - Go to Atlas → Database → Connect
   - Click "Connect your application"
   - Copy the connection string
   - Compare with your MONGO_URI in Render
   - Make sure password is URL-encoded (`@` becomes `%40`)

2. **Test Connection Locally:**
   ```bash
   cd backend
   npm run verify
   ```
   If this works locally but not on Render, it's definitely the IP whitelist.

3. **Check Render Service Status:**
   - Make sure service is not suspended
   - Check if there are any Render platform issues

## Quick Debug Commands

**Test if backend is responding:**
```powershell
Invoke-WebRequest -Uri "https://careerscope-4vvf.onrender.com" -UseBasicParsing
```

**Check specific endpoint:**
```powershell
Invoke-WebRequest -Uri "https://careerscope-4vvf.onrender.com/api/health" -UseBasicParsing
```

## Expected Timeline

1. Add IP to Atlas: 30 seconds
2. Wait for Atlas to activate: 2-3 minutes
3. Redeploy on Render: 2-3 minutes
4. Total: ~5-6 minutes

## Success Indicators

✅ Render logs show: "MongoDB Connected"
✅ Health endpoint returns 200 OK
✅ Jobs endpoint returns data
✅ No more "connection error" in logs
✅ Service stays running (doesn't restart)

## Next Steps After Backend Works

1. Add VITE_API_URL to Vercel (frontend)
2. Redeploy frontend
3. Test complete application
4. Verify jobs load on frontend

---

**Most Important:** Make sure MongoDB Atlas Network Access has `0.0.0.0/0` whitelisted and shows "Active" status. This is the #1 reason for connection failures on Render.

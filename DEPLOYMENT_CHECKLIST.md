# Deployment Checklist

## Current Status
✅ Database: MongoDB Atlas configured with 202 jobs
✅ Backend: Working locally on http://localhost:5001
✅ Data Import: Completed successfully
❌ Render Deployment: Needs environment variables

## Fix Render Deployment Now

### Immediate Action Required
Your Render deployment is failing because environment variables are missing.

**Go to Render Dashboard and add these:**

1. **MONGO_URI**
   ```
   mongodb+srv://gowthamhegde04:7760190064%40Gow@careerscope-cluster.yj9jdyv.mongodb.net/careerscope_db?retryWrites=true&w=majority&appName=careerscope-cluster
   ```

2. **NODE_ENV**
   ```
   production
   ```

3. **PORT**
   ```
   5001
   ```

### Steps:
1. Go to https://dashboard.render.com/
2. Click on your backend service
3. Click "Environment" in left sidebar
4. Click "Add Environment Variable"
5. Add the three variables above
6. Click "Save Changes"
7. Wait for automatic redeploy (2-3 minutes)

## Verify Deployment

After Render redeploys, check:

1. **Logs should show:**
   ```
   MongoDB Connected: ac-fqng8ug-shard-00-00.yj9jdyv.mongodb.net
   🚀 CareerScope API server running on port 5001
   ```

2. **Test endpoints:**
   - Health: `https://your-app.onrender.com/api/health`
   - Jobs: `https://your-app.onrender.com/api/jobs`
   - Stats: `https://your-app.onrender.com/api/jobs/stats`

## Frontend Deployment (Vercel)

Once backend is working:

1. **Update frontend .env:**
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

2. **Deploy to Vercel:**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Or push to GitHub:**
   - Vercel will auto-deploy from your main branch

## Complete Deployment Flow

```
┌─────────────────┐
│  MongoDB Atlas  │ ✅ 202 jobs stored
└────────┬────────┘
         │
         │ Connection
         │
┌────────▼────────┐
│ Render Backend  │ ⚠️  Add env vars
│  (Node.js API)  │
└────────┬────────┘
         │
         │ API calls
         │
┌────────▼────────┐
│ Vercel Frontend │ ⏳ Deploy after backend
│   (React App)   │
└─────────────────┘
```

## Environment Variables Summary

### Backend (Render)
- `MONGO_URI` - MongoDB Atlas connection string
- `NODE_ENV` - production
- `PORT` - 5001
- `FRONTEND_URL` - Your Vercel URL (for CORS)

### Frontend (Vercel)
- `VITE_API_URL` - Your Render backend URL

## Security Checklist
- [x] .env files in .gitignore
- [x] Sensitive data not in code
- [ ] Environment variables set in Render
- [ ] Environment variables set in Vercel
- [ ] MongoDB Atlas IP whitelist configured (0.0.0.0/0 for cloud deployments)

## MongoDB Atlas Network Access

Make sure MongoDB Atlas allows connections from anywhere:
1. Go to MongoDB Atlas dashboard
2. Click "Network Access"
3. Add IP Address: `0.0.0.0/0` (allows all IPs - needed for Render)
4. Or add Render's IP ranges specifically

## Troubleshooting

### Backend won't connect to MongoDB
- Check MONGO_URI is set in Render
- Verify MongoDB Atlas network access allows 0.0.0.0/0
- Check Render logs for connection errors

### Frontend can't reach backend
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Test backend endpoints directly first

### Data not showing
- Run verification: `npm run verify` locally
- Check MongoDB Atlas dashboard
- Verify 202 documents in `jobs` collection

## Next Steps After Fixing Render

1. ✅ Fix Render environment variables (DO THIS NOW)
2. ⏳ Wait for successful deployment
3. ⏳ Test backend endpoints
4. ⏳ Update frontend with backend URL
5. ⏳ Deploy frontend to Vercel
6. ⏳ Test complete application

## Support Links
- Render Dashboard: https://dashboard.render.com/
- MongoDB Atlas: https://cloud.mongodb.com/
- Vercel Dashboard: https://vercel.com/dashboard

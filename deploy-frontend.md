# Quick Frontend Deployment

## What's Your Render Backend URL?

First, get your backend URL from Render dashboard. It should look like:
`https://careerscope-backend-xxxx.onrender.com`

## Fastest Way: Deploy to Vercel (2 minutes)

### Step 1: Update Backend URL
Replace `YOUR_BACKEND_URL` in `frontend/.env.production` with your actual Render URL.

Example:
```
VITE_API_URL=https://careerscope-backend-xxxx.onrender.com/api
```

### Step 2: Deploy
```bash
cd frontend
npx vercel --prod
```

That's it! Follow the prompts and your site will be live.

---

## Alternative: Deploy to Render

1. Go to https://dashboard.render.com/
2. Click "New +" → "Static Site"
3. Connect your GitHub repo
4. Settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add environment variable:
   - **VITE_API_URL**: `https://your-backend.onrender.com/api`
6. Click "Create Static Site"

---

## After Deployment

### Update Backend CORS
Add your frontend URL to backend environment variables in Render:
- **FRONTEND_URL**: `https://your-frontend-url.vercel.app`

### Test Your App
Visit your frontend URL and verify:
- ✅ Home page loads
- ✅ Jobs are displayed
- ✅ Salary calculator works
- ✅ All navigation works

---

## Need Help?

If you get stuck, just tell me:
1. Your Render backend URL
2. Which deployment platform you want to use (Vercel/Render/Netlify)

I'll help you deploy it!

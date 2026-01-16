# 🚀 Quick Cloud Deployment Guide

## Easiest Free Option: Railway (Backend) + Vercel (Frontend)

### Step 1: Deploy Backend to Railway (5 minutes)

1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your Taskaz repository
4. Railway will auto-detect Java and deploy
5. **Copy your backend URL** (e.g., `https://taskaz-backend.up.railway.app`)

### Step 2: Deploy Frontend to Vercel (3 minutes)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "Add New Project" → Import your GitHub repo
3. **Configure**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Add Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: `https://taskaz-backend.up.railway.app` (your Railway URL)
5. Click "Deploy"

### Step 3: Update CORS in Backend

In Railway dashboard, add environment variable:
- Key: `cors.allowed.origins`
- Value: `https://your-app.vercel.app` (your Vercel URL)

Or update `application.properties` and redeploy.

### Done! 🎉

Your app is live:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://taskaz-backend.up.railway.app`

---

## Alternative: Render (Backend) + Netlify (Frontend)

### Backend on Render

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Configure:
   - **Name**: `taskaz-backend`
   - **Environment**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/Taskaz-0.0.1-SNAPSHOT.jar`
   - **Plan**: Free
5. Add environment variable:
   - Key: `cors.allowed.origins`
   - Value: `https://your-app.netlify.app`
6. Deploy

### Frontend on Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repo
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://taskaz-backend.onrender.com`
6. Deploy

---

## Important Notes

1. **Free Tier Limitations**:
   - Render: Apps sleep after 15 min (first request takes ~30s)
   - Railway: $5 credit/month (usually enough for small apps)
   - Vercel/Netlify: Unlimited for frontend

2. **CORS**: Make sure to add your frontend URL to backend CORS settings

3. **Database**: Current setup uses H2 in-memory. For production, add PostgreSQL:
   - Free options: [Supabase](https://supabase.com), [Neon](https://neon.tech), [Railway](https://railway.app)

4. **Environment Variables**:
   - Backend: Set `cors.allowed.origins` in platform dashboard
   - Frontend: Set `VITE_API_URL` in platform dashboard

---

## Troubleshooting

**CORS Errors?**
- Check backend CORS configuration includes your frontend URL
- Verify environment variable `cors.allowed.origins` is set correctly

**API Not Connecting?**
- Verify `VITE_API_URL` is set in frontend environment variables
- Check backend URL is correct (no trailing slash)

**Build Fails?**
- Check Node.js version (should be 18+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

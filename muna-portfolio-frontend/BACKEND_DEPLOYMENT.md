# Backend Deployment Guide

## Current Issue
Your frontend is deployed on Netlify, but the backend API is not accessible. The API calls are failing because:
- The backend is running locally (`http://127.0.0.1:4000`)
- Netlify proxy is pointing to a placeholder URL

## Solution Options

### Option 1: Deploy Backend to a Hosting Service (Recommended)

Deploy your backend to one of these services:

#### A. Railway (Easiest)
1. Go to: https://railway.app
2. Sign up/login
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your backend repo (`muna-portfolio-backend`)
6. Railway will auto-detect and deploy
7. Get your backend URL (e.g., `https://your-app.railway.app`)
8. Update Netlify proxy (see below)

#### B. Render
1. Go to: https://render.com
2. Sign up/login
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Select `muna-portfolio-backend`
6. Build command: `npm install && npm run build`
7. Start command: `npm start`
8. Get your backend URL
9. Update Netlify proxy

#### C. Heroku
1. Go to: https://heroku.com
2. Create new app
3. Connect GitHub repo
4. Deploy
5. Get your backend URL

### Option 2: Update Netlify Proxy

Once your backend is deployed, update `netlify.toml`:

1. Edit `muna-portfolio-frontend/netlify.toml`
2. Replace `https://your-backend-url.com` with your actual backend URL
3. Commit and push
4. Or set environment variables in Netlify (see below)

### Option 3: Set Environment Variables in Netlify

1. Go to Netlify Dashboard → Your Site → Settings
2. Click "Environment variables"
3. Add:
   - `VITE_API_BASE_URL` = `https://your-backend-url.com`
   - `VITE_BACKEND_URL` = `https://your-backend-url.com`
4. Redeploy

## Quick Fix: Make Frontend Work Without Backend (Temporary)

If you want the site to work while you deploy the backend, the fallback data will be used. The error message will show, but the site will still display.

## Recommended Steps

1. **Deploy backend** to Railway/Render/Heroku
2. **Get backend URL** (e.g., `https://muna-portfolio-api.railway.app`)
3. **Update Netlify environment variables**:
   - `VITE_API_BASE_URL` = your backend URL
   - `VITE_BACKEND_URL` = your backend URL
4. **Update netlify.toml** proxy redirect
5. **Redeploy frontend**

# Railway Setup Guide

## Current Issue
Your backend is deployed on Railway but crashing because it can't connect to a database.

## Quick Fix: Add PostgreSQL Database

### Step 1: Add Database Service
1. In your Railway project dashboard
2. Click **"+ New"** button (top right)
3. Select **"Database"** → **"Add PostgreSQL"**
4. Railway will create a PostgreSQL database for you

### Step 2: Link Database to Backend
1. Click on your **`portfolio_backend`** service
2. Go to **"Variables"** tab
3. Railway should automatically add `DATABASE_URL` when you link the database
4. If not, click **"Add Reference"** and select your PostgreSQL database
5. The `DATABASE_URL` will be automatically set

### Step 3: Redeploy
1. Railway should auto-redeploy when you add the database
2. Or manually trigger a redeploy from the **"Deployments"** tab
3. Check the logs - you should see:
   - `✅ Database connection established successfully.`
   - `✅ API running on http://localhost:4000`

## Verify It's Working

1. **Check Logs**: Should show database connection success
2. **Test Health Endpoint**: 
   - Your backend URL: `https://portfolio-backend-production-xxxx.up.railway.app`
   - Test: `https://portfolio-backend-production-xxxx.up.railway.app/health`
   - Should return: `{"ok":true}`

3. **Test Profile Endpoint**:
   - `https://portfolio-backend-production-xxxx.up.railway.app/api/profile`
   - Should return profile data (or empty if no data yet)

## Get Your Backend URL

1. In Railway, click on your `portfolio_backend` service
2. Go to **"Settings"** tab
3. Under **"Networking"**, you'll see your public URL
4. Copy this URL - you'll need it for the frontend

## Update Frontend (After Backend Works)

1. **In Netlify Dashboard**:
   - Go to your site → **"Site settings"** → **"Environment variables"**
   - Add:
     - `VITE_API_BASE_URL` = `https://your-backend-url.up.railway.app`
     - `VITE_BACKEND_URL` = `https://your-backend-url.up.railway.app`

2. **Update `netlify.toml`**:
   - Open `muna-portfolio-frontend/netlify.toml`
   - Update the API proxy:
     ```toml
     [[redirects]]
       from = "/api/*"
       to = "https://your-backend-url.up.railway.app/api/:splat"
       status = 200
       force = true
     ```

3. **Redeploy frontend** on Netlify

## Troubleshooting

### Still seeing MySQL errors?
- Make sure `DATABASE_URL` is set in Railway variables
- The URL should start with `postgresql://` or `postgres://`
- Redeploy after adding the variable

### Database connection still failing?
- Check that the PostgreSQL service is running in Railway
- Verify `DATABASE_URL` is correctly set
- Check Railway logs for more details

### Server still crashing?
- The updated code should now start the server even if database fails
- Check that you've pushed the latest code changes
- Railway should auto-redeploy on git push

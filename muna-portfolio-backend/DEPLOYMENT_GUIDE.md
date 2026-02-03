# Backend Deployment Guide

## Current Issue
Your backend is deployed but can't connect to a database. The error shows:
- `ConnectionRefusedError` - Database connection failed
- The server needs a PostgreSQL database

## Solution: Set Up Database

### Option 1: Use Railway (Easiest - Recommended)

1. **Go to**: https://railway.app
2. **Create new project**
3. **Add PostgreSQL database**:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will create a PostgreSQL database
   - Copy the `DATABASE_URL` from the database service

4. **Set Environment Variables**:
   - In your backend service on Railway
   - Go to "Variables" tab
   - Add: `DATABASE_URL` = (the URL Railway provided)
   - Format: `postgresql://user:password@host:port/database`

5. **Redeploy** your backend service

### Option 2: Use Render

1. **Go to**: https://render.com
2. **Create PostgreSQL database**:
   - Click "New" → "PostgreSQL"
   - Create database
   - Copy the "Internal Database URL"

3. **Set Environment Variables**:
   - In your backend service
   - Add: `DATABASE_URL` = (the database URL from Render)

4. **Redeploy**

### Option 3: Use Neon (Free PostgreSQL)

1. **Go to**: https://neon.tech
2. **Sign up** (free tier available)
3. **Create project**
4. **Copy connection string**
5. **Set as** `DATABASE_URL` in your deployment platform

## Environment Variables Needed

In your deployment platform (Railway/Render/etc.), set:

```
DATABASE_URL=postgresql://user:password@host:port/database
PORT=4000
```

Or use individual variables:
```
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=your_database_host
DB_PORT=5432
```

## After Setting Up Database

1. **Redeploy** your backend
2. **Check logs** - should see "✅ Database connection established successfully"
3. **Get your backend URL** (e.g., `https://your-backend.railway.app`)
4. **Update Netlify**:
   - Set `VITE_API_BASE_URL` = your backend URL
   - Set `VITE_BACKEND_URL` = your backend URL
   - Update `netlify.toml` proxy redirect

## Quick Test

Once deployed, test your backend:
```
https://your-backend-url.com/health
```

Should return: `{"ok":true}`

Then test profile:
```
https://your-backend-url.com/api/profile
```

Should return your profile data.

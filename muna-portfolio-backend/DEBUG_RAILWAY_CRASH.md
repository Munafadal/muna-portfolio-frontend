# Debug Railway Backend "Application failed to respond"

## The Problem
Your Railway backend shows "Application failed to respond" - this means:
- ✅ Service is deployed
- ❌ Service is crashing or not starting
- ❌ Can't handle requests

## Step 1: Check Railway Logs

### Check Deployment Logs
1. Go to Railway → Your backend service (`muna-portfolio-frontend`)
2. Click **"Deployments"** tab
3. Click on the **latest deployment**
4. Check **"Deploy Logs"** or **"Build Logs"**
5. Look for errors (red text)

### Check Runtime Logs
1. Railway → Your backend service
2. Click **"Logs"** tab (or "Observability" → "Logs")
3. Look for:
   - Error messages
   - "Unable to start server"
   - Database connection errors
   - Port binding errors

## Common Issues and Fixes

### Issue 1: Database Connection Failed
**Symptoms:**
- Logs show: "ConnectionRefusedError" or "Database connection failed"
- Logs show: "Unable to start server"

**Fix:**
1. Go to **Variables** tab
2. Verify `DATABASE_URL` is set
3. If missing:
   - Click **"+ New Variable"**
   - Click **"Add Reference"**
   - Select your **Postgres** database
   - Choose **`DATABASE_URL`**
4. Save and redeploy

### Issue 2: Port Not Set Correctly
**Symptoms:**
- Service starts but can't bind to port
- Railway can't connect

**Fix:**
1. Railway → Settings → Networking
2. Make sure port is set to **4000** (or whatever your backend uses)
3. Check your backend code uses `process.env.PORT || 4000`

### Issue 3: Build Failed
**Symptoms:**
- Deployment shows "Failed" status
- Build logs show errors

**Fix:**
1. Check build logs for specific errors
2. Common issues:
   - Missing dependencies
   - TypeScript compilation errors
   - Missing files

### Issue 4: Server Crashes on Start
**Symptoms:**
- Service starts then immediately crashes
- Logs show error then exit

**Fix:**
1. Check runtime logs for the error
2. Common causes:
   - Missing environment variables
   - Database connection fails
   - Code errors

## Quick Debug Steps

### Step 1: Check Service Status
1. Railway → Your backend service
2. Check if it shows:
   - **"Online"** (green) = Good
   - **"Crashed"** (red) = Bad - check logs
   - **"Building"** = Wait for it to finish

### Step 2: Check Latest Logs
1. Railway → Logs tab
2. Look at the most recent entries
3. Copy any error messages

### Step 3: Verify Variables
1. Railway → Variables tab
2. Check:
   - `DATABASE_URL` exists and has a value
   - `PORT` is set (or backend uses default 4000)

### Step 4: Check Database
1. Railway → Your Postgres service
2. Verify it shows **"Online"** (green dot)
3. If offline, that's the problem!

## What to Share for Help

If you need help, share:
1. **Latest deployment logs** (from Deployments tab)
2. **Runtime logs** (from Logs tab)
3. **Service status** (Online/Crashed/Building)
4. **Variables** (screenshot of Variables tab - hide sensitive values)

## Most Likely Issue

Based on our earlier work, the most likely issue is:
- **Database connection failed** - `DATABASE_URL` not set or wrong
- **Server crashing** - Check logs for the specific error

## Next Steps

1. **Check Railway logs** (Deployments → Latest → Deploy Logs)
2. **Check runtime logs** (Logs tab)
3. **Share the error messages** you see
4. **Verify `DATABASE_URL` is set** in Variables tab

Once you check the logs, we can fix the specific issue!

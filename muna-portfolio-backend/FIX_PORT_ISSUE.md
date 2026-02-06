# Fix Railway "Application failed to respond" - Port Issue

## The Problem
Your backend is starting successfully (logs show it's running), but Railway shows "Application failed to respond". This is usually a **port mismatch** issue.

## The Issue
Your logs show:
- `API running on http://localhost:8080`

But Railway might be:
- Expecting a different port
- Or the PORT environment variable isn't set correctly

## Fix: Set PORT Environment Variable

### Step 1: Add PORT Variable in Railway

1. Railway → Your backend service → **Variables** tab
2. Click **"+ New Variable"**
3. Add:
   - **Key**: `PORT`
   - **Value**: `4000` (or whatever port your code uses)
   - Click **"Add variable"**

### Step 2: Verify Railway Networking Settings

1. Railway → Settings → **Networking**
2. Check the port setting
3. Make sure it matches the PORT variable you set (should be `4000`)

### Step 3: Check Your Server Code

Your server should use:
```typescript
const PORT = Number(process.env.PORT) || 4000;
```

This means:
- If `PORT` env var is set → use that
- Otherwise → use 4000

### Step 4: Redeploy

After adding PORT variable:
1. Railway will auto-redeploy
2. Check logs - should see:
   - `API running on http://localhost:4000` (or whatever PORT you set)
3. Test: `https://your-railway-url/health`

## Alternative: Check Railway Networking

1. Railway → Settings → **Networking**
2. Look for **"Generate Service Domain"** section
3. Check what port is configured there
4. Make sure your server uses the same port

## Quick Fix

**Most likely solution:**
1. Add `PORT = 4000` in Railway Variables
2. Redeploy
3. Should work!

The backend is starting correctly, it just needs the right port configuration!

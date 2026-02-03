# CRITICAL: Railway Can't Find Directory - Final Fix

## The Problem
Railway is building but can't find `muna-portfolio-backend` directory even though it exists in git.

## Root Cause
Railway might be:
1. **Using UI build commands** that override `railway.json`
2. **Using sparse checkout** that excludes the directory
3. **Building from wrong commit/branch**

## IMMEDIATE FIX - Do This Now

### Step 1: Clear ALL Build Settings in Railway UI

1. Go to Railway → `portfolio_backend` → **Settings** → **Deploy**
2. **DELETE or CLEAR** any build commands in the UI
3. **DELETE or CLEAR** any start commands in the UI
4. This forces Railway to use `railway.json` from the repo

### Step 2: Verify Root Directory is EMPTY

1. Railway → Settings → Source → Root Directory
2. **MUST BE EMPTY** (clear it if anything is set)
3. Save

### Step 3: Verify Repository Connection

1. Railway → Settings → Source
2. Repository: `Munafadal/muna-portfolio-frontend`
3. Branch: `main`
4. **Make sure it's the latest commit**

### Step 4: Force Fresh Deploy

1. Go to **Deployments** tab
2. Click the **three dots** (⋯) on the latest deployment
3. Select **"Redeploy"** or **"Deploy Latest"**
4. This forces a fresh checkout

## Alternative: Use Railway UI Build Commands

If `railway.json` still doesn't work, set commands directly in UI:

1. **Railway Settings** → **Deploy** → **Build Command**:
   ```
   ls -la && pwd && ls -d */ && cd muna-portfolio-backend && npm install && npm run build
   ```

2. **Railway Settings** → **Deploy** → **Start Command**:
   ```
   cd muna-portfolio-backend && npm start
   ```

The `ls -la && pwd && ls -d */` will show what Railway actually sees.

## Why This Might Work

By clearing UI settings and forcing Railway to read `railway.json`, OR by using explicit debug commands in UI, we can see what Railway actually has access to.

## Check Build Logs

After redeploy, the logs should show:
- What directories exist (`ls -d */`)
- Current path (`pwd`)
- Then attempt to cd into backend

**This will tell us exactly what Railway sees!**

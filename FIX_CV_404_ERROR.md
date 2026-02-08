# Fix: Cannot GET /uploads/cv-xxx.pdf

## The Problem

The CV file is stored on your Railway backend, but the frontend is trying to load it from Amplify. This happens because:

1. **Environment variables were added AFTER the build**
2. **Vite environment variables are baked into the build at build time**
3. **The current deployment doesn't have the backend URL**

## Solution: Trigger a New Build

After adding environment variables, you MUST rebuild the app:

### Step 1: Verify Environment Variables Are Set

1. Go to Amplify Console
2. Go to "Hosting" → Environment variables (or wherever you added them)
3. Make sure both are there:
   - `VITE_API_BASE_URL` = `https://muna-portfolio-frontend-production.up.railway.app`
   - `VITE_BACKEND_URL` = `https://muna-portfolio-frontend-production.up.railway.app`

### Step 2: Trigger a New Build

**Option A: Redeploy (Easiest)**
1. Go to "Overview"
2. Click on the "main" branch
3. Click "Redeploy this version" or "Redeploy"

**Option B: Push a Commit**
1. Make a small change (add a comment or space)
2. Commit and push:
   ```bash
   cd /home/mofad/luulsolutions/portfolio
   git add .
   git commit -m "Trigger rebuild with environment variables"
   git push
   ```
3. Amplify will automatically build with the new environment variables

### Step 3: Wait for Build

- Wait 2-3 minutes for the build to complete
- Check the build logs to make sure it succeeded

### Step 4: Test

1. Visit your site: `https://main.d1uw1mkx15ro9e.amplifyapp.com`
2. Go to the CV page
3. The CV should now load from Railway backend

---

## Why This Happens

Vite environment variables (those starting with `VITE_`) are:
- Read at **build time** (not runtime)
- Baked into the JavaScript bundle
- Cannot be changed without rebuilding

So if you add environment variables after building, the old build still has the old values (or no values).

---

## Quick Fix

**Just push a commit to trigger a new build:**

```bash
cd /home/mofad/luulsolutions/portfolio
echo "# Trigger rebuild" >> README.md
git add .
git commit -m "Trigger rebuild with environment variables"
git push
```

This will trigger Amplify to rebuild with the environment variables you just added!

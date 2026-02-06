# Fix "Failed to fetch" Error

## The Problem
"Failed to fetch" means the frontend can't connect to the backend. This could be:

1. ❌ Railway URL in `netlify.toml` is still a placeholder
2. ❌ Backend not running or wrong URL
3. ❌ CORS issues
4. ❌ Environment variables not set

## Step-by-Step Fix

### Step 1: Verify Your Railway Backend is Running

1. Go to Railway → Your backend service
2. Check it shows **"Online"** (green dot)
3. If it's "Crashed" or "Offline", check the logs

### Step 2: Get Your Actual Railway Backend URL

1. Railway → Your backend service → **Settings** → **Networking**
2. Copy your **public domain** URL
   - Should look like: `https://muna-portfolio-frontend-production-xxxx.up.railway.app`
   - **NOT** the placeholder with `xxxx`!

### Step 3: Update netlify.toml with Real URL

1. Edit `muna-portfolio-frontend/netlify.toml`
2. Find line 22 (the `to =` line in the redirects section)
3. Replace the placeholder URL with your actual Railway URL:
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://your-actual-railway-url.up.railway.app/api/:splat"
     status = 200
     force = true
   ```

### Step 4: Test Backend Directly

Before updating Netlify, test your backend:
1. Open: `https://your-railway-url.up.railway.app/health`
2. Should return: `{"ok":true}`
3. Test: `https://your-railway-url.up.railway.app/api/profile`
4. Should return JSON (even if empty)

**If these don't work, your backend isn't running correctly!**

### Step 5: Verify Environment Variables in Netlify

1. Netlify Dashboard → Your site → **Site settings** → **Environment variables**
2. Check these exist:
   - `VITE_API_BASE_URL` = `https://your-railway-url.up.railway.app`
   - `VITE_BACKEND_URL` = `https://your-railway-url.up.railway.app`
3. Make sure they have the **actual Railway URL**, not a placeholder

### Step 6: Commit and Redeploy

```bash
git add muna-portfolio-frontend/netlify.toml
git commit -m "Update netlify.toml with actual Railway backend URL"
git push
```

### Step 7: Check Browser Console

After redeploy:
1. Open your Netlify site
2. Press **F12** to open browser console
3. Go to **Network** tab
4. Refresh the page
5. Look for the `/api/profile` request
6. Check:
   - What URL is it trying to hit?
   - What's the response?
   - Any CORS errors?

## Common Issues

### Issue 1: Placeholder URL Still in netlify.toml
- **Fix**: Replace `muna-portfolio-frontend-production-xxxx` with your actual Railway domain

### Issue 2: Backend Not Running
- **Fix**: Check Railway logs, make sure backend is "Online"

### Issue 3: CORS Error
- **Fix**: Backend should already have CORS enabled, but check Railway logs

### Issue 4: Wrong URL Format
- **Fix**: Make sure Railway URL starts with `https://` and doesn't have trailing slashes

## Quick Debug

1. **Test backend directly**: `https://your-railway-url/health`
2. **Check netlify.toml**: Make sure URL is real, not placeholder
3. **Check Netlify env vars**: Should have actual Railway URL
4. **Check browser console**: See what error it shows
5. **Check Railway logs**: Make sure backend is running

## Still Not Working?

Share:
1. Your actual Railway backend URL (from Railway Settings → Networking)
2. What you see in browser console (Network tab)
3. Railway backend status (Online/Crashed?)

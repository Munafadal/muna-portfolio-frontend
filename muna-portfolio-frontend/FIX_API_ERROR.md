# Fix "Unexpected token '<'" Error

## The Problem
The error "Unexpected token '<', "<!doctype "... is not valid JSON" means:
- The API call is returning HTML (404 page) instead of JSON
- This happens when the frontend can't reach the backend

## Causes
1. ❌ `netlify.toml` still has placeholder URL
2. ❌ Environment variables not set correctly
3. ❌ Backend not running or wrong URL

## Fix Step-by-Step

### Step 1: Get Your Railway Backend URL

1. Go to Railway → Your backend service
2. Settings → Networking
3. Copy your public domain URL
   - Should look like: `https://muna-portfolio-frontend-production-xxxx.up.railway.app`

### Step 2: Update netlify.toml

1. Edit `muna-portfolio-frontend/netlify.toml`
2. Find line 22:
   ```toml
   to = "YOUR_RAILWAY_BACKEND_URL/api/:splat"
   ```
3. Replace `YOUR_RAILWAY_BACKEND_URL` with your actual Railway URL:
   ```toml
   to = "https://muna-portfolio-frontend-production-xxxx.up.railway.app/api/:splat"
   ```
4. Save

### Step 3: Verify Environment Variables in Netlify

1. Netlify Dashboard → Your site → Site settings → Environment variables
2. Check these exist:
   - `VITE_API_BASE_URL` = `https://your-railway-url.up.railway.app`
   - `VITE_BACKEND_URL` = `https://your-railway-url.up.railway.app`
3. If missing, add them (see previous instructions)

### Step 4: Test Backend Directly

1. Open your Railway backend URL in browser:
   - `https://your-railway-url.up.railway.app/health`
   - Should return: `{"ok":true}`
2. Test API:
   - `https://your-railway-url.up.railway.app/api/profile`
   - Should return JSON (or empty object if no data)

### Step 5: Commit and Redeploy

```bash
cd muna-portfolio-frontend
git add netlify.toml
git commit -m "Update netlify.toml with Railway backend URL"
git push
```

Netlify will auto-redeploy.

### Step 6: Clear Browser Cache

After redeploy:
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Or open in incognito/private window

## Quick Debug Checklist

- [ ] Railway backend URL is correct
- [ ] `netlify.toml` has actual URL (not placeholder)
- [ ] Environment variables set in Netlify
- [ ] Backend is online in Railway
- [ ] Backend `/health` endpoint works
- [ ] Committed and pushed changes
- [ ] Netlify redeployed
- [ ] Cleared browser cache

## Still Not Working?

Check browser console (F12) → Network tab:
1. Look for the `/api/profile` request
2. Check what URL it's trying to hit
3. Check the response - is it HTML or JSON?

If it's HTML, the proxy isn't working. Double-check `netlify.toml`.

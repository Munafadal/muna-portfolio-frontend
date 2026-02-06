# Connect Netlify Frontend to Railway Backend

## Step 1: Get Your Railway Backend URL

From Railway:
- Your backend URL should look like: `https://muna-portfolio-frontend-production-xxxx.up.railway.app`
- Copy this URL

## Step 2: Set Environment Variables in Netlify

### Option A: Using Netlify Dashboard (Easiest)

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Click on your site

2. **Open Site Settings**
   - Click **"Site settings"** (gear icon) in the top navigation
   - Or: Click your site → **"Site configuration"** → **"Environment variables"**

3. **Add Environment Variables**
   - Click **"Add a variable"** or **"Add variable"**
   - Add these two variables:

   **Variable 1:**
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-railway-backend-url.up.railway.app`
   - **Scopes**: Select "All scopes" or "Production, Deploy previews, Branch deploys"
   - Click **"Add variable"**

   **Variable 2:**
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://your-railway-backend-url.up.railway.app`
   - **Scopes**: Select "All scopes" or "Production, Deploy previews, Branch deploys"
   - Click **"Add variable"**

4. **Save**
   - Make sure both variables are saved

### Option B: Using netlify.toml (Alternative)

You can also add them to `netlify.toml`:
```toml
[build.environment]
  VITE_API_BASE_URL = "https://your-railway-backend-url.up.railway.app"
  VITE_BACKEND_URL = "https://your-railway-backend-url.up.railway.app"
```

## Step 3: Update netlify.toml Proxy

1. **Edit** `muna-portfolio-frontend/netlify.toml`

2. **Find the API proxy section** (look for `[[redirects]]` with `/api/*`)

3. **Update it** to point to your Railway backend:
   ```toml
   # API Proxy - Points to Railway backend
   [[redirects]]
     from = "/api/*"
     to = "https://your-railway-backend-url.up.railway.app/api/:splat"
     status = 200
     force = true
   ```

4. **Replace** `https://your-railway-backend-url.up.railway.app` with your actual Railway URL

5. **Save the file**

## Step 4: Commit and Push Changes

```bash
cd muna-portfolio-frontend
git add netlify.toml
git commit -m "Update Netlify proxy to point to Railway backend"
git push
```

## Step 5: Redeploy on Netlify

### Automatic Redeploy
- Netlify will automatically detect the git push and redeploy
- Wait for deployment to complete

### Manual Redeploy (if needed)
1. Go to Netlify Dashboard → Your site
2. Click **"Deploys"** tab
3. Click **"Trigger deploy"** → **"Deploy site"**

## Step 6: Verify It Works

### Test Backend Directly
1. Open: `https://your-railway-backend-url.up.railway.app/health`
2. Should return: `{"ok":true}`

### Test Frontend → Backend Connection
1. Visit your Netlify site
2. Open browser console (F12)
3. Check for errors
4. Try accessing:
   - Profile page (should load data from backend)
   - CV page (should load CV from backend)

### Test API Proxy
1. Visit: `https://your-netlify-site.netlify.app/api/profile`
2. Should return profile data (proxied through Netlify to Railway)

## Troubleshooting

### Frontend Still Shows Errors
- Check browser console for specific error messages
- Verify environment variables are set correctly in Netlify
- Make sure you redeployed after setting variables

### API Calls Fail
- Verify Railway backend is online
- Check Railway logs for errors
- Test backend URL directly in browser
- Verify `netlify.toml` proxy is correct

### Environment Variables Not Working
- Make sure variable names start with `VITE_` (required for Vite)
- Redeploy after adding variables
- Check variable scopes (should include production)

## Quick Checklist

- [ ] Got Railway backend URL
- [ ] Added `VITE_API_BASE_URL` in Netlify
- [ ] Added `VITE_BACKEND_URL` in Netlify
- [ ] Updated `netlify.toml` proxy
- [ ] Committed and pushed changes
- [ ] Netlify redeployed
- [ ] Tested backend URL directly
- [ ] Tested frontend → backend connection
- [ ] Everything works! 🎉

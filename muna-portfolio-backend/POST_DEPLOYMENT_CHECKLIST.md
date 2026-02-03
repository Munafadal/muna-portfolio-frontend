# Post-Deployment Checklist - What to Do After Backend is Deployed

## ✅ Step 1: Verify Backend is Running

### Check Deployment Status
1. Go to Railway → `muna-portfolio-frontend` service (your backend)
2. Check the **Deployments** tab
3. Look for:
   - ✅ **Green "Active"** status (not "Failed" or "Crashed")
   - ✅ Service shows **"Online"** (green dot)

### Check Logs
1. Click on the latest deployment
2. Check **"Deploy Logs"** or **"Runtime Logs"**
3. You should see:
   - `✅ Database connection established successfully.`
   - `✅ Database tables synced successfully.`
   - `✅ API running on http://localhost:4000`

If you see errors, check:
- Database connection issues → Go to Step 2
- Build errors → Check build logs

## ✅ Step 2: Verify Database Connection

### Check Variables
1. Go to **Variables** tab
2. Verify `DATABASE_URL` is set
3. It should have a value like: `postgresql://...`

### If Database Connection Failed
1. **Variables** tab → Click **"+ New Variable"**
2. Click **"Add Reference"**
3. Select your **Postgres** database
4. Choose **`DATABASE_URL`**
5. Save and redeploy

## ✅ Step 3: Get Your Backend URL

### Generate Public Domain
1. Go to Railway → Settings tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"** or **"Public Domain"**
4. Railway will create a URL like: `https://muna-portfolio-frontend-production-xxxx.up.railway.app`
5. **Copy this URL** - you'll need it for the frontend!

### Test Backend Health
1. Open the URL in a browser or use curl:
   ```
   https://your-backend-url.up.railway.app/health
   ```
2. Should return: `{"ok":true}`

### Test API Endpoint
1. Try: `https://your-backend-url.up.railway.app/api/profile`
2. Should return profile data (or empty object if no data yet)

## ✅ Step 4: Connect Frontend to Backend

### Update Netlify Environment Variables
1. Go to **Netlify Dashboard** → Your site
2. **Site settings** → **Environment variables**
3. Add/Update:
   - `VITE_API_BASE_URL` = `https://your-backend-url.up.railway.app`
   - `VITE_BACKEND_URL` = `https://your-backend-url.up.railway.app`
4. **Save**

### Update netlify.toml
1. Edit `muna-portfolio-frontend/netlify.toml`
2. Update the API proxy:
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://your-backend-url.up.railway.app/api/:splat"
     status = 200
     force = true
   ```
3. Replace `https://your-backend-url.up.railway.app` with your actual Railway URL
4. Commit and push:
   ```bash
   git add muna-portfolio-frontend/netlify.toml
   git commit -m "Update Netlify proxy to point to Railway backend"
   git push
   ```

### Redeploy Frontend
1. Netlify should auto-redeploy after you push
2. Or manually trigger: Netlify → Deploys → Trigger deploy

## ✅ Step 5: Test Everything Works

### Test Frontend → Backend Connection
1. Visit your Netlify site
2. Check browser console (F12) for errors
3. Try accessing pages that use the API:
   - Profile page
   - CV page
4. Should load data from backend (not show errors)

### Test API Endpoints
Test these URLs directly:
- `https://your-backend-url.up.railway.app/health` → Should return `{"ok":true}`
- `https://your-backend-url.up.railway.app/api/profile` → Should return profile data
- `https://your-backend-url.up.railway.app/api/docs` → Should show Swagger documentation

## ✅ Step 6: Monitor and Maintain

### Set Up Monitoring
1. Railway → **Metrics** tab
2. Monitor:
   - CPU usage
   - Memory usage
   - Request count
   - Error rate

### Check Logs Regularly
1. Railway → **Logs** tab
2. Watch for:
   - Database connection errors
   - API errors
   - High memory usage

### Set Up Alerts (Optional)
1. Railway → Settings → Notifications
2. Set up alerts for:
   - Deployment failures
   - Service crashes
   - High error rates

## 🎉 Success Indicators

You're done when:
- ✅ Backend shows "Online" in Railway
- ✅ Health endpoint returns `{"ok":true}`
- ✅ Frontend can load data from backend
- ✅ No errors in browser console
- ✅ Database is connected and tables are created

## 🆘 Troubleshooting

### Backend is "Crashed"
- Check logs for errors
- Verify `DATABASE_URL` is set
- Check build logs for compilation errors

### Frontend Can't Connect to Backend
- Verify `VITE_API_BASE_URL` is set in Netlify
- Check `netlify.toml` proxy is correct
- Test backend URL directly in browser

### Database Connection Failed
- Verify `DATABASE_URL` in Railway Variables
- Check Postgres service is "Online"
- Check logs for connection errors

## Next Steps

Once everything is working:
1. **Add your profile data** via the API or admin panel
2. **Upload your CV** via the CV page
3. **Test all features** end-to-end
4. **Share your portfolio** with the world! 🚀

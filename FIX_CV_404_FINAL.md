# Fix CV 404 Error - Final Steps

## The Problem

The CV is trying to load from Amplify (`main.d1uw1mkx15ro9e.amplifyapp.com`) instead of Railway backend. This means environment variables weren't included in the build.

## Step 1: Check Network Tab

1. **In browser console, click "Network" tab** (next to Console)
2. **Refresh the CV page** (F5)
3. **Look for the CV file request:**
   - Find: `cv-1770425217305-755306622.pdf`
   - Check the "Request URL" column
   - **If it shows:** `https://main.d1uw1mkx15ro9e.amplifyapp.com/uploads/...` ❌ Wrong!
   - **Should show:** `https://muna-portfolio-frontend-production.up.railway.app/uploads/...` ✅ Correct!

## Step 2: Verify Environment Variables in Amplify

1. **Go to Amplify Console:**
   - https://console.aws.amazon.com/amplify/home?region=eu-west-2
   - Click "muna-portfolio-frontend"

2. **Find Environment Variables:**
   - **Try these locations:**
     - Left sidebar → "Hosting" → Look for "Environment variables"
     - Or: Click "main" branch → "Environment variables" tab
     - Or: "App settings" → "Branch settings" → "main" → "Environment variables"

3. **Check if these exist:**
   - `VITE_API_BASE_URL` = `https://muna-portfolio-frontend-production.up.railway.app`
   - `VITE_BACKEND_URL` = `https://muna-portfolio-frontend-production.up.railway.app`

## Step 3: Add Variables (If Missing)

1. **Click "Add variable" or "+"**
2. **Add:**
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://muna-portfolio-frontend-production.up.railway.app`
3. **Add:**
   - **Name:** `VITE_BACKEND_URL`
   - **Value:** `https://muna-portfolio-frontend-production.up.railway.app`
4. **Save both**

## Step 4: Trigger Rebuild (CRITICAL!)

**After adding variables, you MUST rebuild:**

### Option A: Redeploy (Fastest)
1. Go to "Overview"
2. Click on "main" branch
3. Click "Redeploy this version"
4. Wait 2-3 minutes

### Option B: Push Commit
```bash
cd /home/mofad/luulsolutions/portfolio
git commit --allow-empty -m "Rebuild with environment variables"
git push
```

## Step 5: Verify Build Used Variables

After rebuild completes:

1. **Check build logs:**
   - Go to "main" branch → "Build logs"
   - Look for environment variables being set
   - Should see the Railway URL in the build

2. **Test in browser:**
   - Visit CV page
   - Open Network tab (F12)
   - Refresh page
   - Check CV request URL - should now point to Railway!

## Step 6: Test CV File Exists

Before fixing, verify the file exists on Railway:

1. **Visit:** `https://muna-portfolio-frontend-production.up.railway.app/uploads/cv-1770425217305-755306622.pdf`
2. **If it downloads/displays** → File exists ✅
3. **If 404** → File might not be on Railway (need to re-upload)

---

## Quick Checklist

- [ ] Checked Network tab - what URL is being requested?
- [ ] Verified environment variables exist in Amplify
- [ ] Added variables if missing
- [ ] Triggered rebuild (redeploy or push commit)
- [ ] Waited for build to complete
- [ ] Tested CV page again
- [ ] Verified CV loads from Railway backend

---

## Most Important Step

**After adding environment variables, you MUST trigger a rebuild!** 

The current build doesn't have the variables. Push a commit or redeploy to rebuild with the variables included.

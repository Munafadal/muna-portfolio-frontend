# How to Test CV Page and Fix Environment Variables

## Step 1: Test the CV Page

1. **Open your browser**
2. **Visit:** `https://main.d1uw1mkx15ro9e.amplifyapp.com/cv`
3. **Check if the CV loads:**
   - If it loads ✅ - You're done!
   - If you see "Cannot GET /uploads/..." ❌ - Continue to Step 2

---

## Step 2: Check Environment Variables in Amplify

### Option A: From Hosting Section

1. **Go to Amplify Console:**
   - https://console.aws.amazon.com/amplify/home?region=eu-west-2
   - Click on "muna-portfolio-frontend"

2. **Navigate to Environment Variables:**
   - Left sidebar → "Hosting"
   - Look for "Environment variables" or "Variables"
   - Click on it

3. **Check if these exist:**
   - `VITE_API_BASE_URL` = `https://muna-portfolio-frontend-production.up.railway.app`
   - `VITE_BACKEND_URL` = `https://muna-portfolio-frontend-production.up.railway.app`

### Option B: From Branch Settings

1. **Left sidebar → "App settings" → "Branch settings"**
2. **Click on "main" branch**
3. **Look for "Environment variables" tab**
4. **Check the variables there**

---

## Step 3: Add/Update Environment Variables (If Missing)

1. **Click "Add variable" or "+" button**

2. **Add first variable:**
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://muna-portfolio-frontend-production.up.railway.app`
   - Click "Save"

3. **Add second variable:**
   - **Name:** `VITE_BACKEND_URL`
   - **Value:** `https://muna-portfolio-frontend-production.up.railway.app`
   - Click "Save"

---

## Step 4: Trigger a New Build

After adding/updating environment variables, you MUST rebuild:

### Method 1: Redeploy from Amplify (Easiest)

1. **Go to "Overview"** (left sidebar)
2. **Click on the "main" branch card**
3. **Click "Redeploy this version"** or "Redeploy" button
4. **Wait 2-3 minutes** for build to complete

### Method 2: Push a Commit (Automatic)

1. **Open your terminal**
2. **Run these commands:**
   ```bash
   cd /home/mofad/luulsolutions/portfolio
   git commit --allow-empty -m "Trigger rebuild with environment variables"
   git push
   ```
3. **Amplify will automatically detect the commit and rebuild**
4. **Wait 2-3 minutes** for build to complete

### Method 3: Make a Small Code Change

1. **Edit any file** (add a space or comment):
   ```bash
   cd /home/mofad/luulsolutions/portfolio
   echo " " >> README.md
   git add .
   git commit -m "Trigger rebuild"
   git push
   ```

---

## Step 5: Verify Build Includes Environment Variables

After the build completes:

1. **Check build logs:**
   - Go to "main" branch → "Build logs"
   - Look for environment variables being set
   - Should see something like: `VITE_API_BASE_URL=...`

2. **Test in browser console:**
   - Visit your site
   - Press F12 to open console
   - Run:
     ```javascript
     console.log('API URL:', import.meta.env.VITE_API_BASE_URL);
     console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
     ```
   - Should show the Railway URL (not `undefined`)

---

## Step 6: Test CV Again

1. **Visit:** `https://main.d1uw1mkx15ro9e.amplifyapp.com/cv`
2. **The CV should now load from Railway backend**
3. **Check the browser console (F12) → Network tab:**
   - Look for the CV request
   - Should be going to: `https://muna-portfolio-frontend-production.up.railway.app/uploads/...`
   - Not: `/uploads/...`

---

## Quick Checklist

- [ ] Tested CV page - does it load?
- [ ] Checked environment variables in Amplify
- [ ] Added/updated `VITE_API_BASE_URL`
- [ ] Added/updated `VITE_BACKEND_URL`
- [ ] Triggered new build (redeploy or push commit)
- [ ] Waited for build to complete
- [ ] Tested CV page again
- [ ] Verified CV loads from Railway backend

---

## If Still Not Working

1. **Check Railway backend is running:**
   - Visit: `https://muna-portfolio-frontend-production.up.railway.app/health`
   - Should return: `{"ok":true}`

2. **Check CV file exists:**
   - Visit: `https://muna-portfolio-frontend-production.up.railway.app/uploads/cv-1770425217305-755306622.pdf`
   - Should download or display the PDF

3. **Check browser console for errors:**
   - Press F12
   - Look for any red error messages
   - Check Network tab for failed requests

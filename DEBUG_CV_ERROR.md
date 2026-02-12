# Debug CV Error: Cannot GET /uploads/...

## Quick Debug Steps

### Step 1: Check Browser Console

1. **Open your CV page:** `https://main.d1uw1mkx15ro9e.amplifyapp.com/cv`
2. **Press F12** to open developer tools
3. **Click "Console" tab**
4. **Look for:** `CV URL: /uploads/... → Full URL: ...`
5. **Check what the "Full URL" shows:**
   - ✅ If it shows: `https://muna-portfolio-frontend-production.up.railway.app/uploads/...` → Good!
   - ❌ If it shows: `/uploads/...` or `http://127.0.0.1:4000/uploads/...` → Environment variables not set

### Step 2: Check Environment Variables in Amplify

1. **Go to Amplify Console:**
   - https://console.aws.amazon.com/amplify/home?region=eu-west-2
   - Click "muna-portfolio-frontend"

2. **Find Environment Variables:**
   - Try: "Hosting" → "Environment variables"
   - Or: "App settings" → "Branch settings" → "main" → "Environment variables"
   - Or: Click "main" branch → Look for "Variables" tab

3. **Verify these exist:**
   - `VITE_API_BASE_URL` = `https://muna-portfolio-frontend-production.up.railway.app`
   - `VITE_BACKEND_URL` = `https://muna-portfolio-frontend-production.up.railway.app`

### Step 3: Add Variables (If Missing)

1. **Click "Add variable"**
2. **Add:**
   - Name: `VITE_API_BASE_URL`
   - Value: `https://muna-portfolio-frontend-production.up.railway.app`
3. **Add:**
   - Name: `VITE_BACKEND_URL`
   - Value: `https://muna-portfolio-frontend-production.up.railway.app`
4. **Save**

### Step 4: Trigger Rebuild

**After adding variables, you MUST rebuild:**

#### Option A: Redeploy
1. Go to "Overview"
2. Click "main" branch
3. Click "Redeploy this version"
4. Wait 2-3 minutes

#### Option B: Push Empty Commit
```bash
cd /home/mofad/luulsolutions/portfolio
git commit --allow-empty -m "Rebuild with environment variables"
git push
```

### Step 5: Test Again

1. **Wait for build to complete** (check build logs)
2. **Visit CV page again**
3. **Check browser console** - should show Railway URL now
4. **CV should load!**

---

## What the Console Should Show

**Before fix:**
```
CV URL: /uploads/cv-xxx.pdf → Full URL: /uploads/cv-xxx.pdf
```

**After fix:**
```
CV URL: /uploads/cv-xxx.pdf → Full URL: https://muna-portfolio-frontend-production.up.railway.app/uploads/cv-xxx.pdf
```

---

## Quick Test: Direct Railway URL

Test if the CV file exists on Railway:

1. **Visit:** `https://muna-portfolio-frontend-production.up.railway.app/uploads/cv-1770425217305-755306622.pdf`
2. **If it downloads/displays** → File exists, just need to fix the URL
3. **If 404** → File might not exist on Railway

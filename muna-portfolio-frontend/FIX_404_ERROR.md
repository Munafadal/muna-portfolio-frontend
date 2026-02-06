# Fix 404 Error - Profile Not Found

## The Problem
Getting "Request failed (404)" when trying to load profile. This could mean:

1. ✅ **Backend is reachable** (no more "Failed to fetch")
2. ❌ **Endpoint returns 404** - either route doesn't exist OR no profile in database

## Step 1: Test Backend Directly

Test your Railway backend URL directly in browser:

1. **Test health endpoint:**
   ```
   https://muna-portfolio-frontend-production.up.railway.app/health
   ```
   Should return: `{"ok":true}`

2. **Test profile endpoint:**
   ```
   https://muna-portfolio-frontend-production.up.railway.app/api/profile
   ```
   
   **If it returns 404 with message "No profile found":**
   - This is correct! The database is empty
   - You need to create a profile first
   
   **If it returns a different 404:**
   - The route might not be working
   - Check Railway logs for errors

## Step 2: Check Railway Logs

1. Railway → Your backend service → **Logs** tab
2. Look for any errors when accessing `/api/profile`
3. Check if the route is being hit

## Step 3: Create a Profile (If Database is Empty)

If the database is empty, you need to create a profile. Options:

### Option A: Use the API directly
```bash
curl -X POST https://muna-portfolio-frontend-production.up.railway.app/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Muna Osman",
    "email": "muna@example.com",
    "bio": "Software Development Engineer",
    "location": "London, UK"
  }'
```

### Option B: Use Swagger UI
1. Visit: `https://muna-portfolio-frontend-production.up.railway.app/api/docs`
2. Find the POST `/api/profile` endpoint
3. Try it out and create a profile

### Option C: Add profile via code/script
Create a script to seed the database with initial profile data.

## Step 4: Verify netlify.toml is Correct

I fixed the syntax error in `netlify.toml`. Make sure it's committed and pushed:

```bash
git add muna-portfolio-frontend/netlify.toml
git commit -m "Fix netlify.toml API proxy"
git push
```

## Most Likely Cause

The 404 is probably because:
- ✅ Backend is working
- ✅ Route exists (`/api/profile`)
- ❌ **Database is empty** - no profile record exists yet

The backend code returns 404 if no profile is found:
```typescript
if (!profile) return res.status(404).json({ message: "No profile found" });
```

## Quick Test

1. Visit: `https://muna-portfolio-frontend-production.up.railway.app/api/profile`
2. If you see: `{"message":"No profile found"}` → Database is empty, create a profile
3. If you see a different error → Check Railway logs

## Next Steps

1. **Test backend URL directly** in browser
2. **Check what the 404 response says** (is it "No profile found"?)
3. **If database is empty**, create a profile using one of the methods above
4. **Redeploy frontend** after fixing netlify.toml

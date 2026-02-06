# Complete Setup Guide - Step by Step

## Current Status
- ✅ Backend is running on Railway
- ✅ Database is connected
- ✅ Frontend is deployed on Netlify
- ❌ Database is empty (no profile yet)
- ❌ Frontend can't load profile (404 error)

## Step-by-Step Solution

### Step 1: Create a Profile in the Database

You need to create a profile record in your database. Choose one method:

#### Method A: Using Browser (Easiest)

1. **Open your Railway backend URL in browser:**
   ```
   https://muna-portfolio-frontend-production.up.railway.app/api/profile
   ```
   - You should see: `{"message":"No profile found"}`

2. **Open browser console** (Press F12)

3. **Run this command** in the console:
   ```javascript
   fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: "Muna Osman",
       email: "muna@example.com",
       bio: "Software Development Engineer",
       location: "London, UK",
       nationality: "Somali / British",
       availability: "Immediately available",
       github: "https://github.com/Munafadal",
       linkedin: "https://linkedin.com/in/your-linkedin",
       expectedSalery: 65000,
       ownACar: false,
       haveDrivingLicence: true,
       noticePeriod: "0-1 month",
       immigrationStatus: "Right to work in the UK",
       willingToRelocate: true,
       languages: "English, Arabic, Somali",
       skills: "React, TypeScript, Node.js, Vite, Tailwind CSS, REST APIs"
     })
   })
   .then(response => response.json())
   .then(data => {
     console.log('Profile created:', data);
     alert('Profile created successfully!');
   })
   .catch(error => {
     console.error('Error:', error);
     alert('Error creating profile');
   });
   ```

4. **Check the response** - should show your profile with an `id`

#### Method B: Using curl (Terminal)

1. **Open your terminal**

2. **Run this command:**
   ```bash
   curl -X POST https://muna-portfolio-frontend-production.up.railway.app/api/profile \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Muna Osman",
       "email": "muna@example.com",
       "bio": "Software Development Engineer",
       "location": "London, UK",
       "nationality": "Somali / British",
       "availability": "Immediately available",
       "github": "https://github.com/Munafadal",
       "linkedin": "https://linkedin.com/in/your-linkedin",
       "expectedSalery": 65000,
       "ownACar": false,
       "haveDrivingLicence": true,
       "noticePeriod": "0-1 month",
       "immigrationStatus": "Right to work in the UK",
       "willingToRelocate": true,
       "languages": "English, Arabic, Somali",
       "skills": "React, TypeScript, Node.js, Vite, Tailwind CSS, REST APIs"
     }'
   ```

3. **You should see** your profile data returned as JSON

#### Method C: Using Postman or Insomnia

1. **Create a new POST request**
2. **URL:** `https://muna-portfolio-frontend-production.up.railway.app/api/profile`
3. **Method:** POST
4. **Headers:** `Content-Type: application/json`
5. **Body:** (raw JSON)
   ```json
   {
     "name": "Muna Osman",
     "email": "muna@example.com",
     "bio": "Software Development Engineer",
     "location": "London, UK",
     "nationality": "Somali / British",
     "availability": "Immediately available",
     "github": "https://github.com/Munafadal",
     "linkedin": "https://linkedin.com/in/your-linkedin",
     "expectedSalery": 65000,
     "ownACar": false,
     "haveDrivingLicence": true,
     "noticePeriod": "0-1 month",
     "immigrationStatus": "Right to work in the UK",
     "willingToRelocate": true,
     "languages": "English, Arabic, Somali",
     "skills": "React, TypeScript, Node.js, Vite, Tailwind CSS, REST APIs"
   }
   ```
6. **Send** the request

### Step 2: Verify Profile Was Created

1. **Test GET endpoint** in browser:
   ```
   https://muna-portfolio-frontend-production.up.railway.app/api/profile
   ```
   - Should now return your profile data (not 404)

2. **Or use browser console:**
   ```javascript
   fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile')
     .then(r => r.json())
     .then(console.log)
   ```

### Step 3: Commit and Push Code Changes

You have some code changes that need to be pushed:

```bash
cd /home/mofad/luulsolutions/portfolio

# Add all changes
git add muna-portfolio-frontend/netlify.toml
git add muna-portfolio-backend/src/docs/swagger.ts

# Commit
git commit -m "Fix netlify.toml API proxy and update Swagger URL"

# Push
git push
```

### Step 4: Verify Netlify Configuration

1. **Check netlify.toml** is correct:
   - Line 22 should have: `to = "https://muna-portfolio-frontend-production.up.railway.app/api/:splat"`

2. **Check Netlify Environment Variables:**
   - Go to Netlify Dashboard → Your site → Site settings → Environment variables
   - Verify these exist:
     - `VITE_API_BASE_URL` = `https://muna-portfolio-frontend-production.up.railway.app`
     - `VITE_BACKEND_URL` = `https://muna-portfolio-frontend-production.up.railway.app`

### Step 5: Wait for Netlify to Redeploy

After pushing code:
1. Netlify will auto-redeploy
2. Wait for deployment to complete
3. Check deployment logs for errors

### Step 6: Test Your Frontend

1. **Visit your Netlify site:**
   - `https://munaosman-portfolio.netlify.app` (or your Netlify URL)

2. **Check the Profile page:**
   - Should now load your profile data
   - No more "Failed to fetch" or 404 errors

3. **Check browser console** (F12):
   - Should see no errors
   - Network tab should show successful API calls

### Step 7: Verify Everything Works

Test these endpoints:

1. **Health check:**
   - `https://muna-portfolio-frontend-production.up.railway.app/health`
   - Should return: `{"ok":true}`

2. **Profile API:**
   - `https://muna-portfolio-frontend-production.up.railway.app/api/profile`
   - Should return your profile data

3. **Swagger docs:**
   - `https://muna-portfolio-frontend-production.up.railway.app/api/docs`
   - Should show API documentation

4. **Frontend:**
   - Your Netlify site should display your profile

## Troubleshooting

### Still Getting 404?

1. **Check backend logs:**
   - Railway → Logs tab
   - Look for errors when accessing `/api/profile`

2. **Verify profile exists:**
   - Test: `https://muna-portfolio-frontend-production.up.railway.app/api/profile`
   - Should return profile data, not 404

### Frontend Still Shows Errors?

1. **Check browser console** (F12):
   - Look for specific error messages
   - Check Network tab for failed requests

2. **Verify Netlify proxy:**
   - Check `netlify.toml` has correct Railway URL
   - Verify environment variables are set

3. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Backend Not Responding?

1. **Check Railway service status:**
   - Should show "Online" (green dot)

2. **Check Railway logs:**
   - Look for errors or crashes

3. **Verify environment variables:**
   - `DATABASE_URL` is set
   - `JWT_SECRET` is set
   - `PORT` is set (optional, defaults to 4000)

## Success Checklist

- [ ] Profile created in database
- [ ] GET `/api/profile` returns profile data
- [ ] `netlify.toml` has correct Railway URL
- [ ] Netlify environment variables are set
- [ ] Code changes committed and pushed
- [ ] Netlify redeployed successfully
- [ ] Frontend loads profile data
- [ ] No errors in browser console

## Next Steps After Setup

1. **Update your profile data** via the API or Swagger UI
2. **Upload your CV** via the CV page
3. **Customize your portfolio** content
4. **Share your portfolio** URL with others!

## Quick Reference

**Backend URL:**
- `https://muna-portfolio-frontend-production.up.railway.app`

**Frontend URL:**
- `https://munaosman-portfolio.netlify.app` (or your Netlify URL)

**API Endpoints:**
- Health: `/health`
- Profile: `/api/profile`
- CV: `/api/cv`
- Docs: `/api/docs`

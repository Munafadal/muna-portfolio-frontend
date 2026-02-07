# Fix Profile Update 500 Error

If you're getting a **500 Internal Server Error** when updating your profile, here's how to fix it:

## Step 1: Check Railway Backend Logs

The error details are logged on Railway. To see them:

1. **Go to Railway Dashboard:**
   - Visit: https://railway.app
   - Click on your backend service

2. **View Logs:**
   - Click on the "Deployments" tab
   - Click on the latest deployment
   - Or go to the "Logs" tab to see real-time logs

3. **Look for the error:**
   - Search for: `UPDATE PROFILE ERROR:`
   - This will show the actual error message

## Step 2: Common Issues and Fixes

### Issue 1: Invalid Email Format
**Error:** `Validation error: Invalid email format`

**Fix:** Make sure your email is in valid format:
```json
{
  "email": "your.email@example.com"  ✅ Correct
  "email": "invalid-email"            ❌ Wrong
}
```

### Issue 2: Duplicate Email
**Error:** `A profile with this email already exists`

**Fix:** The email you're trying to use is already taken by another profile. Use a different email or update the other profile first.

### Issue 3: Invalid Data Type
**Error:** Database error or type mismatch

**Common issues:**
- `expectedSalery` should be a **number** (not a string)
- `ownACar`, `haveDrivingLicence`, `willingToRelocate` should be **boolean** (true/false, not strings)
- `dateOfBirth` should be in format: `"YYYY-MM-DD"` (e.g., `"1990-01-15"`)

**Correct format:**
```json
{
  "name": "Muna Osman",
  "email": "muna@example.com",
  "expectedSalery": 50000,           ✅ Number
  "ownACar": true,                  ✅ Boolean
  "haveDrivingLicence": false,       ✅ Boolean
  "willingToRelocate": true,        ✅ Boolean
  "dateOfBirth": "1990-01-15"       ✅ Date string
}
```

### Issue 4: Database Connection Issue
**Error:** Connection errors or timeout

**Fix:** 
- Check Railway database is running
- Verify `DATABASE_URL` environment variable is set correctly in Railway

### Issue 5: Missing Required Fields
**Error:** Validation error for required fields

**Fix:** Make sure `name` and `email` are always included:
```json
{
  "name": "Muna Osman",    ✅ Required
  "email": "muna@example.com"  ✅ Required
}
```

## Step 3: Test with Minimal Data

Try updating with just the required fields first:

```javascript
fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Muna Osman",
    email: "muna@example.com"
  })
})
.then(res => res.json())
.then(data => console.log('✅ Success:', data))
.catch(err => console.error('❌ Error:', err));
```

If this works, then add other fields one by one to find which field is causing the issue.

## Step 4: Check What Data You're Sending

Before updating, check what your current profile looks like:

```javascript
fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile/1')
  .then(res => res.json())
  .then(data => console.log('Current profile:', data));
```

Compare this with what you're trying to send to see if there are any type mismatches.

## Step 5: Use Swagger UI for Better Error Messages

1. Go to: `https://muna-portfolio-frontend-production.up.railway.app/api/docs`
2. Find `PUT /api/profile/{id}`
3. Click "Try it out"
4. Enter your profile ID
5. Enter your data
6. Click "Execute"
7. Check the response - it should now show more detailed error messages

## Quick Debug Checklist

- [ ] Check Railway logs for the actual error message
- [ ] Verify email format is correct
- [ ] Check that `expectedSalery` is a number (not string)
- [ ] Check that boolean fields are true/false (not "true"/"false")
- [ ] Verify `dateOfBirth` is in "YYYY-MM-DD" format
- [ ] Make sure `name` and `email` are included
- [ ] Try updating with minimal data first

## Still Having Issues?

If you're still getting errors after trying the above:

1. **Share the error message from Railway logs** - this will help identify the exact issue
2. **Share the JSON data you're trying to send** - I can check if there are any issues with the format
3. **Check if the profile exists:**
   ```javascript
   fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile/1')
     .then(res => res.json())
     .then(data => console.log('Profile exists:', data));
   ```

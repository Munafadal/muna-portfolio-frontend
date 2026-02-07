# How to Check Backend Logs for Profile Update Error

## Important: Check the Backend Service Logs (Not Database Logs)

The database logs you're seeing are for PostgreSQL. You need to check the **backend service logs** to see the actual profile update error.

## Step 1: Find Your Backend Service

1. **Go to Railway Dashboard:**
   - Visit: https://railway.app
   - You should see multiple services:
     - **Postgres** (database) - This is what you're currently looking at
     - **Your Backend Service** (Node.js/Express) - This is what you need!

2. **Click on your Backend Service:**
   - It might be named something like:
     - `muna-portfolio-backend`
     - `portfolio-backend`
     - `backend`
     - Or the service that runs your Express.js server

## Step 2: View Backend Logs

1. **Click on the "Logs" tab** (or "Deployments" → Latest deployment → Logs)

2. **Look for these error messages:**
   - `UPDATE PROFILE ERROR:`
   - `Failed to update profile`
   - Any Sequelize errors
   - Database connection errors

3. **Filter the logs:**
   - Use the search/filter box to search for: `UPDATE PROFILE` or `ERROR`

## Step 3: Reproduce the Error

While the logs are open, try updating your profile again:

1. **Using Swagger UI:**
   - Go to: `https://muna-portfolio-frontend-production.up.railway.app/api/docs`
   - Try the `PUT /api/profile/1` endpoint again

2. **Or using browser console:**
   ```javascript
   fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile/1', {
     method: 'PUT',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       name: "Muna Osman",
       email: "test@example.com"
     })
   })
   .then(res => res.json())
   .then(data => console.log('Response:', data))
   .catch(err => console.error('Error:', err));
   ```

3. **Watch the logs in real-time** - you should see the error appear immediately

## Step 4: Common Error Messages to Look For

### Database Connection Error
```
ConnectionRefusedError
SequelizeConnectionRefusedError
```

**Fix:** Database might be restarting. Wait a minute and try again.

### Validation Error
```
SequelizeValidationError
Validation error
```

**Fix:** Check the data you're sending - email format, required fields, etc.

### Unique Constraint Error
```
SequelizeUniqueConstraintError
A profile with this email already exists
```

**Fix:** The email is already taken by another profile.

### Type Error
```
invalid input syntax for type decimal
invalid input syntax for type boolean
```

**Fix:** Check data types - `expectedSalery` should be a number, booleans should be true/false.

## Step 5: Share the Error

Once you see the error in the backend logs, copy the full error message. It will look something like:

```
UPDATE PROFILE ERROR: SequelizeValidationError: Validation error: Invalid email format
```

or

```
UPDATE PROFILE ERROR: SequelizeDatabaseError: invalid input syntax for type decimal: "50000"
```

This will help identify the exact issue!

## Quick Test: Is Backend Running?

Before checking logs, verify your backend is running:

1. **Test health endpoint:**
   ```
   https://muna-portfolio-frontend-production.up.railway.app/health
   ```
   Should return: `{"ok":true}`

2. **Test get profile:**
   ```
   https://muna-portfolio-frontend-production.up.railway.app/api/profile
   ```
   Should return your profile data

If these don't work, your backend might not be running or there's a connection issue.

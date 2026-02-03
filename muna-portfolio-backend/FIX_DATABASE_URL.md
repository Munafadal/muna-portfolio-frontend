# Fix DATABASE_URL in Railway

## Current Situation
- ✅ `DATABASE_URL` exists in your variables
- ⚠️ Backend is still crashing
- ⚠️ Banner says "Trying to connect a database? Add Variable"

This means `DATABASE_URL` might not be correctly linked to your Postgres service.

## Solution: Re-link DATABASE_URL

### Option 1: Edit Existing DATABASE_URL (Recommended)

1. **Click on the `DATABASE_URL` variable** (the one with the asterisks)
2. You should see an option to **"Edit"** or change its source
3. Make sure it's set to reference your **Postgres** service
4. If it's not linked, click **"Add Reference"** or select **"Postgres"** from a dropdown
5. Save the changes

### Option 2: Delete and Re-add (If Option 1 doesn't work)

1. **Delete the existing `DATABASE_URL`**:
   - Click on `DATABASE_URL`
   - Look for a delete/trash icon
   - Remove it

2. **Add it again with proper reference**:
   - Click **"+ New Variable"** button
   - In the variable name field, type: `DATABASE_URL`
   - Click **"Add Reference"** button (next to the input)
   - Select **"Postgres"** from the dropdown
   - Select **`DATABASE_URL`** from the Postgres variables list
   - Save

### Option 3: Use Raw Editor

1. Click **"Raw Editor"** button (top right)
2. You'll see all variables in JSON format
3. Find `DATABASE_URL`
4. Make sure it references the Postgres service correctly
5. Save

## After Fixing DATABASE_URL

1. **Railway will auto-redeploy** your backend
2. **Check the logs**:
   - Go to "Deployments" tab
   - Click on latest deployment
   - Check "Deploy Logs" or "Runtime Logs"
   - You should see:
     - `📦 Using DATABASE_URL for database connection`
     - `✅ Database connection established successfully.`
     - `✅ API running on http://localhost:4000`

## Verify It's Working

After redeploy, check:
- Backend service should show **"Online"** (not "Crashed")
- Logs should show successful database connection
- You can test: `https://your-backend-url.up.railway.app/health`

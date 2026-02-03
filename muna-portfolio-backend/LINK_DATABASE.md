# How to Link Postgres Database to Backend in Railway

## Current Problem
Your backend is deployed but crashing because it can't connect to the database. You need to link the Postgres database.

## Step-by-Step: Link Database

### Step 1: Go to Your Backend Service

1. **In Railway dashboard**, look at the **left sidebar**
2. **Click on your backend service** (it might be named "muna-portfolio-backend" or "portfolio_backend")
3. **NOT** the Postgres service - click on the backend service!

### Step 2: Open Variables Tab

1. Once you're in the backend service, look at the **top navigation tabs**
2. You should see: "Deployments", "Variables", "Metrics", "Settings"
3. **Click on "Variables"** tab

### Step 3: Add Database Reference

In the Variables tab, you should see one of these:

**Option A: "New Variable" button**
1. Click **"+ New Variable"** or **"New Variable"** button
2. Look for **"Add Reference"** option
3. Click it
4. A dropdown/select menu should appear
5. **Select "Postgres"** from the list
6. Railway will automatically add `DATABASE_URL`

**Option B: "Raw Editor" or "Edit" button**
1. Click **"Raw Editor"** or **"Edit"** button
2. You'll see a JSON editor or list of variables
3. Look for a way to **"Add Reference"** or select from a dropdown
4. Select **"Postgres"**

**Option C: Direct Variable Addition**
1. Click **"+ New Variable"**
2. In the **Name** field, type: `DATABASE_URL`
3. For the **Value**, you need to get it from Postgres:
   - Go to **Postgres** service → **Variables** tab
   - Copy the `DATABASE_URL` value
   - Paste it in the backend service variable

### Step 4: Verify

After adding, you should see:
- `DATABASE_URL` in the variables list
- It should have a value like: `postgresql://user:password@host:port/database`

### Step 5: Redeploy

1. Railway should **auto-redeploy** when you add the variable
2. Or manually trigger a redeploy:
   - Go to **"Deployments"** tab
   - Click **"Redeploy"** or **"Deploy"**

### Step 6: Check Logs

After redeploy, check the logs:
1. Go to **"Deployments"** tab
2. Click on the latest deployment
3. Check **"Deploy Logs"** or **"Runtime Logs"**
4. You should see:
   - `✅ Database connection established successfully.`
   - `✅ Database tables synced successfully.`
   - `✅ API running on http://localhost:4000`

## If You Can't Find "Add Reference"

### Manual Method:

1. **Get Database URL from Postgres**:
   - Click on **"Postgres"** service in left sidebar
   - Go to **"Variables"** tab
   - Look for `DATABASE_URL` or `POSTGRES_URL`
   - Copy the entire value (it's long, starts with `postgresql://`)

2. **Add to Backend**:
   - Go to your **backend service** → **"Variables"** tab
   - Click **"+ New Variable"**
   - **Name**: `DATABASE_URL`
   - **Value**: (paste the URL you copied)
   - Click **"Add"** or **"Save"**

3. **Redeploy** the backend service

## Troubleshooting

### Still seeing MySQL errors?
- Make sure you're using the latest code (push your changes to GitHub)
- Railway should auto-redeploy on git push

### Still can't connect?
- Verify `DATABASE_URL` is set in backend service variables
- Check that Postgres service shows "Online" (green dot)
- Check the logs for more specific error messages

### Server still crashing?
- The updated code should start the server even if DB fails
- Make sure you've pushed the latest `server.ts` changes to GitHub
- Railway should auto-redeploy when you push

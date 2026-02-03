# Deploy Backend to Railway - Step by Step

## Current Situation
You have the Postgres database set up, but the backend service (`portfolio_backend`) is not deployed yet. You need to deploy it.

## Step-by-Step Instructions

### Step 1: Deploy Backend Service

1. **In Railway Dashboard** (where you are now):
   - Look at the **top left** - you should see a **"+"** button or **"New"** button
   - Click it to add a new service

2. **Select Deployment Method**:
   - Choose **"GitHub Repo"** or **"Deploy from GitHub repo"**
   - OR if your code is already in a repo, select **"Empty Service"** and we'll configure it

3. **If using GitHub**:
   - Connect your GitHub account if not already connected
   - Select the repository that contains `muna-portfolio-backend`
   - Railway will auto-detect it's a Node.js app

4. **If using Empty Service**:
   - Railway will ask you to connect a GitHub repo or upload files
   - Connect your repo with the backend code

### Step 2: Configure the Service

After creating the service, Railway will show you configuration options:

1. **Root Directory** (if your backend is in a subfolder):
   - Set to: `muna-portfolio-backend`
   - OR if Railway auto-detected it, leave as is

2. **Build Command**:
   - Should be: `npm install && npm run build`
   - Railway might auto-detect this

3. **Start Command**:
   - Should be: `npm start`
   - Railway might auto-detect this

### Step 3: Link the Database

1. **In your new backend service**:
   - Click on the service (it might be called something like "muna-portfolio-backend" or "portfolio_backend")
   - Go to the **"Variables"** tab

2. **Add Database Reference**:
   - Click **"+ New Variable"** or **"Add Reference"**
   - Select your **"Postgres"** database from the dropdown
   - Railway will automatically add `DATABASE_URL`

3. **Verify**:
   - You should see `DATABASE_URL` in the variables list
   - It should have a value like `postgresql://...`

### Step 4: Wait for Deployment

1. Railway will automatically:
   - Install dependencies
   - Build the TypeScript code
   - Start the server

2. **Check the Logs**:
   - Click on your backend service
   - Go to **"Deployments"** tab
   - Click on the latest deployment
   - Check **"Deploy Logs"**
   - You should see:
     - `✅ Database connection established successfully.`
     - `✅ Database tables synced successfully.`
     - `✅ API running on http://localhost:4000`

### Step 5: Get Your Backend URL

1. **In your backend service**:
   - Go to **"Settings"** tab
   - Scroll to **"Networking"** section
   - You'll see a **"Public Domain"** or **"Generate Domain"** button
   - Click it to get your public URL
   - It will look like: `https://portfolio-backend-production-xxxx.up.railway.app`

2. **Copy this URL** - you'll need it for the frontend!

## Troubleshooting

### If you don't see a "+" button:
- You might need to scroll the left sidebar
- Or click on the project name at the top to see all services

### If the build fails:
- Check that `package.json` has the correct scripts
- Make sure TypeScript is installed
- Check the deploy logs for specific errors

### If database connection fails:
- Make sure you linked the Postgres database in Variables
- Check that `DATABASE_URL` is set
- Verify the database is "Online" (green dot)

## Next Steps (After Backend is Deployed)

Once your backend is working:

1. **Update Netlify**:
   - Go to Netlify Dashboard → Your Site → Settings → Environment Variables
   - Add:
     - `VITE_API_BASE_URL` = your Railway backend URL
     - `VITE_BACKEND_URL` = your Railway backend URL

2. **Update netlify.toml**:
   - Edit `muna-portfolio-frontend/netlify.toml`
   - Update the API proxy to point to your Railway backend URL

3. **Redeploy frontend** on Netlify

# Railway Quick Start - What to Do RIGHT NOW

## ⚠️ Important: You Need TWO Services

Right now you only have:
- ✅ **Postgres** (database) - DONE!

You still need:
- ❌ **Backend Service** (your Node.js API) - NOT DEPLOYED YET

## Step 1: Deploy Your Backend Service FIRST

### Find the "+" Button to Add Service

**Look in these places:**

1. **Left Sidebar** (most common):
   - Look at the very top of the left sidebar
   - Above the "Postgres" card
   - There should be a **"+"** button or **"New"** button
   - Click it

2. **Top Navigation Bar**:
   - Look at the top where it says "Architecture | Observability | Logs | Settings"
   - There might be a **"+"** or **"New"** button near the project name

3. **Main Content Area**:
   - In the center of the screen
   - There might be a **"New Service"** or **"Add Service"** button

### After Clicking "+" or "New":

1. **Select "GitHub Repo"** or **"Deploy from GitHub repo"**
2. **Connect your GitHub** (if not already connected)
3. **Select your repository** that has the `muna-portfolio-backend` folder
4. Railway will start deploying automatically

### If You Don't See a "+" Button:

Try these:
- **Click on the project name** "compassionate-generosity" at the top left
- Look for a **"Services"** or **"Add Service"** option
- Check if there's a **hamburger menu** (three lines) that shows more options

## Step 2: After Backend Service is Created

Once you see a new service in the left sidebar (like "muna-portfolio-backend"):

1. **Click on that backend service** (NOT Postgres)
2. **Wait for it to deploy** (check the "Deployments" tab)
3. **Then** go to **"Variables"** tab
4. **Now** you'll see options to add variables

## Step 3: Link Database (ONLY After Step 1 & 2)

Once you have the backend service:

1. In the **backend service** (not Postgres), go to **"Variables"** tab
2. You should see:
   - A button that says **"New Variable"** or **"Raw Editor"** or **"Add Reference"**
   - OR a dropdown/select menu
3. **Click it** and look for:
   - **"Add Reference"** option
   - OR a way to select your **"Postgres"** database
4. Select **"Postgres"** from the list
5. Railway will automatically create `DATABASE_URL`

## Alternative: Manual Database URL

If you can't find "Add Reference", you can manually add it:

1. In your **backend service** → **"Variables"** tab
2. Click **"New Variable"** or **"Raw Editor"**
3. Get the database URL from Postgres:
   - Click on **"Postgres"** service
   - Go to **"Variables"** tab
   - Look for `DATABASE_URL` or connection string
   - Copy it
4. Go back to **backend service** → **"Variables"**
5. Add new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: (paste the connection string you copied)

## What You Should See After Step 1

After deploying the backend, your left sidebar should show:
- 📦 **muna-portfolio-backend** (or similar name) ← NEW!
- 🐘 **Postgres** ← You already have this
- 💾 **postgres-volume** ← You already have this

## Still Can't Find It?

**Tell me:**
1. Do you see ANY "+" or "New" button anywhere?
2. What do you see when you click on the project name "compassionate-generosity"?
3. Is your backend code in a GitHub repository? (We need to know this to deploy it)

# Visual Guide: Fix Netlify Build Settings

## Step 1: Click on Your Project
- On the Projects page, you should see "munaosman-portfolio"
- **Click directly on the project name** "munaosman-portfolio" (or click the arrow icon → on the right side)
- This will take you to the **site dashboard** (not team settings)

## Step 2: Find the Settings Icon
After clicking your project, you should see:
- A page with tabs at the top like: **Overview**, **Deploys**, **Functions**, **Plugins**, etc.
- Look for a **⚙️ Settings** button/icon (usually in the top right area, or in a sidebar)
- **Click the Settings icon/button**

## Step 3: Navigate to Build Settings
In the Settings page:
- You'll see a **left sidebar** with different setting categories
- Look for **"Build & deploy"** in that sidebar
- **Click "Build & deploy"**

## Step 4: Edit Build Settings
In the Build & deploy section:
- Scroll down to find **"Build settings"**
- You should see:
  - Build command: (currently shows `remix vite:build`)
  - Publish directory: (currently shows `dist/client`)
- Look for an **"Edit settings"** button (usually on the right side)
- **Click "Edit settings"**

## Step 5: Update the Values
A form will appear. Change:

1. **Build command** field:
   - Delete: `remix vite:build`
   - Type: `npm install && npm run build`

2. **Publish directory** field:
   - Delete: `dist/client`
   - Type: `dist`

3. **Base directory** field (if it exists):
   - Make sure it's **empty**

4. **Click "Save"** button

## Step 6: Deploy
- Go to the **"Deploys"** tab (top navigation)
- Click **"Trigger deploy"** dropdown
- Select **"Clear cache and deploy site"**

## 🆘 If You Can't Find Settings

### Alternative Navigation:
1. After clicking "munaosman-portfolio", look for:
   - A **gear icon** ⚙️ anywhere on the page
   - Or a **"Settings"** link in the top navigation
   - Or a **hamburger menu** (☰) that might have Settings

### Direct URL Method:
Try going directly to this URL (replace with your actual site name):
```
https://app.netlify.com/sites/munaosman-portfolio/configuration/deploys
```

### What You Should See:
- The Settings page should have sections like:
  - General
  - Build & deploy ← **This is what you need**
  - Domain management
  - Environment variables
  - etc.

## 📸 What to Look For

When you're in the right place, you should see:
- **Build command** field showing: `remix vite:build` (this is what you need to change)
- **Publish directory** field showing: `dist/client` (this also needs to change)
- An **"Edit settings"** or **"Edit"** button nearby

## ✅ Success Indicators

After you save, you should see:
- A success message like "Settings saved"
- The build command should now show: `npm install && npm run build`
- The publish directory should show: `dist`

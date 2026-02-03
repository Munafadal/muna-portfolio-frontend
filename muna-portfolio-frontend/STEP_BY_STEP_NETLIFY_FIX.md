# Step-by-Step: Fix Netlify Build Settings

## Why This Is Happening
Netlify auto-detected Remix framework and set the build command in the UI. UI settings **always override** the `netlify.toml` file, so we need to change them manually.

## ✅ Solution: Update Netlify Dashboard (5 minutes)

### Step 1: Open Netlify Dashboard
1. Go to: **https://app.netlify.com**
2. Log in if needed
3. Click on your site name (should be `muna-portfolio-frontend` or similar)

### Step 2: Navigate to Build Settings
1. Click the **⚙️ Settings** button (gear icon) in the top navigation
2. In the left sidebar, click **Build & deploy**
3. Scroll down to the **Build settings** section
4. You should see:
   - Build command: `remix vite:build` ❌ (WRONG)
   - Publish directory: `dist/client` ❌ (WRONG)

### Step 3: Edit Build Settings
1. Click the **Edit settings** button (usually on the right side)
2. A form will appear with the current settings

### Step 4: Update Build Command
1. Find the **Build command** field
2. **Delete** the current value: `remix vite:build`
3. **Type** the new value: `npm install && npm run build`
4. Or copy-paste this exact command:
   ```
   npm install && npm run build
   ```

### Step 5: Update Publish Directory
1. Find the **Publish directory** field
2. **Delete** the current value: `dist/client`
3. **Type** the new value: `dist`
4. Or copy-paste: `dist`

### Step 6: Clear Base Directory
1. Find the **Base directory** field (if it exists)
2. **Delete** any value in it (leave it empty)
3. If it's already empty, leave it as is

### Step 7: Save Changes
1. Scroll down and click the **Save** button
2. You should see a confirmation message

### Step 8: Trigger New Deploy
1. Go to the **Deploys** tab (top navigation)
2. Click **Trigger deploy** dropdown button
3. Select **Clear cache and deploy site**
4. Wait for the build to complete

## ✅ Verify It Worked

After the deploy, check the build logs. You should see:
- ✅ Build command: `npm install && npm run build` (not `remix vite:build`)
- ✅ Build completes successfully
- ✅ Site deploys to `dist` directory

## 🆘 If You Can't Find the Settings

If you can't locate the settings:
1. Make sure you're logged in as the site owner/admin
2. Try this direct URL (replace `YOUR_SITE_NAME`):
   ```
   https://app.netlify.com/sites/YOUR_SITE_NAME/configuration/deploys
   ```
3. Or go to: Site → Settings → Build & deploy → Build settings

## 📝 Alternative: Contact Netlify Support

If you don't have access to change these settings:
1. You might not be the site owner
2. Ask the site owner to make these changes
3. Or contact Netlify support to help reset the build settings

## ⚠️ Important Notes

- **UI settings ALWAYS override netlify.toml** - This is by design in Netlify
- **You cannot fix this with code alone** - The dashboard change is required
- **Once fixed, future deploys will work** - You only need to do this once

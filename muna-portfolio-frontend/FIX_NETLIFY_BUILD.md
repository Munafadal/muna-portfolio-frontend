# ⚠️ CRITICAL: Fix Netlify Build Settings

## The Problem
Netlify is detecting Remix and using the wrong build command (`remix vite:build`) from the UI settings, which overrides the `netlify.toml` file.

## The Solution - Manual Fix Required

You **MUST** manually update the build settings in Netlify Dashboard:

### Step-by-Step Instructions:

1. **Go to Netlify Dashboard**
   - Navigate to: https://app.netlify.com
   - Select your site

2. **Open Build Settings**
   - Click: **Site settings** (gear icon)
   - Click: **Build & deploy** (left sidebar)
   - Scroll to: **Build settings** section
   - Click: **Edit settings** button

3. **Update Build Command**
   - **Build command**: Change from `remix vite:build` to:
     ```
     npm install && npm run build
     ```

4. **Update Publish Directory**
   - **Publish directory**: Change from `dist/client` to:
     ```
     dist
     ```

5. **Clear Base Directory**
   - **Base directory**: Leave **EMPTY** (or delete any value)

6. **Save and Deploy**
   - Click **Save**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Clear cache and deploy site**

## Why This Is Needed

- Netlify's auto-detection found Remix in your root package.json
- The UI settings override the `netlify.toml` file
- Manual configuration ensures the correct Vite build process

## After Fixing

Once you update the build settings, the build should work correctly because:
- ✅ `@vitejs/plugin-react` is now in dependencies (will be installed)
- ✅ `netlify.toml` has correct redirects for SPA routing
- ✅ Build command will use `vite build` instead of `remix vite:build`

## Verify

After deployment, check:
- Build logs show: `npm install && npm run build`
- Build completes successfully
- Site loads correctly

# 🚀 Quick Fix for Netlify Build

## The Problem
Netlify is using `remix vite:build` instead of `vite build` because:
1. It auto-detected Remix framework
2. UI settings override the `netlify.toml` file

## ✅ Solution (Choose One)

### Method 1: Update Netlify Dashboard (RECOMMENDED - 2 minutes)

1. **Go to**: https://app.netlify.com
2. **Click**: Your site name
3. **Click**: ⚙️ Settings (gear icon)
4. **Click**: Build & deploy (left sidebar)
5. **Click**: Edit settings (under Build settings)
6. **Change**:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Base directory: (leave empty)
7. **Click**: Save
8. **Go to**: Deploys tab → Trigger deploy → Clear cache and deploy

### Method 2: Use Netlify CLI (Alternative)

If you have Netlify CLI installed:

```bash
netlify api updateSite --data '{
  "build_settings": {
    "cmd": "npm install && npm run build",
    "dir": "dist"
  }
}'
```

### Method 3: Delete and Reconnect Site

1. Delete the site from Netlify
2. Reconnect your GitHub repo
3. Netlify will read `netlify.toml` correctly this time

## ⚠️ Why UI Settings Override Config

This is by design in Netlify:
- UI settings have **highest priority**
- `netlify.toml` is used as **fallback** only
- Once UI settings are set, they override the config file

## ✅ After Fixing

Your build will:
- ✅ Use `npm run build` (which runs `vite build`)
- ✅ Publish from `dist` folder
- ✅ Work correctly!

## 🆘 Still Having Issues?

1. Make sure you're the site owner/admin
2. Check that `netlify.toml` is in the repo root
3. Try clearing Netlify build cache
4. Contact Netlify support if needed

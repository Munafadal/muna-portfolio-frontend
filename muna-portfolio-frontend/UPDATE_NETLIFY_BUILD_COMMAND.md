# Update Netlify Build Command

## ✅ Good News!
You successfully updated the build command! It's now using `npm install && npm run build` ✅

## ⚠️ New Issue
The build is running in the **wrong directory**. It's trying to build from the root, but your project is in the `muna-portfolio-frontend` subdirectory.

## 🔧 Fix: Update Build Command Again

Go back to Netlify Settings and update the build command:

### Current (Wrong):
```
npm install && npm run build
```

### New (Correct):
```
cd muna-portfolio-frontend && npm install && npm run build
```

### Also Update:
- **Publish directory**: Change from `dist` to `muna-portfolio-frontend/dist`
- **Base directory**: Set to `muna-portfolio-frontend` (if this field exists)

## 📝 Steps:

1. Go to: Netlify Dashboard → Your Site → Settings → Build & deploy
2. Click: **Edit settings**
3. Update **Build command** to:
   ```
   cd muna-portfolio-frontend && npm install && npm run build
   ```
4. Update **Publish directory** to:
   ```
   muna-portfolio-frontend/dist
   ```
5. Update **Base directory** to:
   ```
   muna-portfolio-frontend
   ```
6. Click: **Save**
7. Deploy: **Deploys** tab → **Trigger deploy** → **Clear cache and deploy site**

## ✅ After This Fix

The build will:
- ✅ Change to the correct directory first
- ✅ Install dependencies in `muna-portfolio-frontend`
- ✅ Run the build script
- ✅ Publish from the correct `dist` folder

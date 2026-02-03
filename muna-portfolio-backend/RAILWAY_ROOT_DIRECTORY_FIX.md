# Fix Railway Root Directory Error

## Error Message
```
Could not find root directory: muna-portfolio-backend
```

## The Problem
Railway is looking for the directory but can't find it. This could be:
1. **Case sensitivity** - Directory name might be different
2. **Path format** - Railway might need a different path
3. **Repository structure** - Files might not be in the expected location

## Solutions to Try

### Solution 1: Check Exact Directory Name
In Railway Settings → Source → Root Directory, try:
- `muna-portfolio-backend` (current)
- `./muna-portfolio-backend`
- `muna-portfolio-backend/`

### Solution 2: Verify Repository Connection
1. Go to Railway → Settings → Source
2. Make sure it's connected to: `Munafadal/muna-portfolio-frontend`
3. Make sure branch is: `main`

### Solution 3: Use Empty Root Directory
1. In Railway Settings → Source → Root Directory
2. **Leave it EMPTY** (don't set anything)
3. Railway will build from repo root
4. **BUT** you'll need to update build commands:

**Update Build Command:**
```
cd muna-portfolio-backend && npm install && npm run build
```

**Update Start Command:**
```
cd muna-portfolio-backend && npm start
```

### Solution 4: Check Railway.json
Make sure `railway.json` exists in the backend directory with correct paths.

### Solution 5: Verify Files Are Pushed
Make sure all backend files are committed and pushed:
```bash
cd /home/mofad/luulsolutions/portfolio
git add muna-portfolio-backend/
git commit -m "Ensure backend files are committed"
git push
```

## Recommended Fix

**Try Solution 3 first** - Use empty root directory and update build commands:

1. **Railway Settings** → **Source** → **Root Directory**: Leave EMPTY
2. **Railway Settings** → **Deploy** → **Build Command**: 
   ```
   cd muna-portfolio-backend && npm install && npm run build
   ```
3. **Railway Settings** → **Deploy** → **Start Command**:
   ```
   cd muna-portfolio-backend && npm start
   ```

This tells Railway to build from root, but run commands in the backend directory.

## Verify It Works

After updating, Railway should:
1. Clone the repository
2. Run `cd muna-portfolio-backend && npm install && npm run build`
3. Run `cd muna-portfolio-backend && npm start`
4. Deploy successfully

Check the build logs - you should see it entering the backend directory and running npm commands.

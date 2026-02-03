# Push Code and Deploy

## ✅ Code Changes Committed

I've committed the database connection fixes. Now you need to:

## Step 1: Push to GitHub

Run this command in your terminal:

```bash
cd muna-portfolio-backend
git push
```

Or if you're in the root directory:

```bash
git push
```

## Step 2: Railway Will Auto-Redeploy

Once you push:
1. Railway will detect the new commit
2. It will automatically start a new deployment
3. Check the "Deployments" tab to see it deploying

## Step 3: Verify DATABASE_URL is Set

Before the deployment finishes, make sure:
1. Go to your backend service → "Variables" tab
2. Verify `DATABASE_URL` is listed there
3. It should have a value like `postgresql://...`

## Step 4: Check Logs After Deployment

After Railway finishes deploying, check the logs:
1. Go to "Deployments" tab
2. Click on the latest deployment
3. Check "Deploy Logs" or "Runtime Logs"
4. You should see:
   - `📦 Using DATABASE_URL for database connection` (if DATABASE_URL is set)
   - `✅ Database connection established successfully.`
   - `✅ Database tables synced successfully.`
   - `✅ API running on http://localhost:4000`

## If You Still See Errors

If you still see MySQL errors or connection refused:
1. **Verify DATABASE_URL is set**: Check Variables tab
2. **Check the logs**: Look for the "📦 Using..." message to see which config it's using
3. **Make sure Postgres is Online**: Check that Postgres service shows green "Online" status

## Next Steps After Backend Works

Once your backend is running:
1. Get your backend URL from Railway (Settings → Networking)
2. Update Netlify environment variables
3. Update netlify.toml proxy
4. Redeploy frontend

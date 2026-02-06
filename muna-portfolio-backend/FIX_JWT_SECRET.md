# Fix Railway Backend Crash - Missing JWT_SECRET

## The Error
```
UNCAUGHT EXCEPTION: Error: JWT_SECRET is not defined
```

## The Problem
Your backend needs a `JWT_SECRET` environment variable for authentication, but it's not set in Railway.

## Quick Fix

### Step 1: Add JWT_SECRET to Railway

1. Go to Railway → Your backend service (`muna-portfolio-frontend`)
2. Click **"Variables"** tab
3. Click **"+ New Variable"**
4. Add:
   - **Key**: `JWT_SECRET`
   - **Value**: Generate a random secret (see below)
   - **Scopes**: "All scopes"
   - Click **"Add variable"**

### Step 2: Generate a Secure JWT Secret

You can use any long random string. Here are options:

**Option A: Use a random string generator**
- Go to: https://randomkeygen.com/
- Copy a "CodeIgniter Encryption Keys" value
- Use that as your `JWT_SECRET`

**Option B: Generate locally**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option C: Use a simple secure string**
- Any long random string works, e.g.: `your-super-secret-jwt-key-change-this-in-production-12345`

### Step 3: Also Fix DATABASE_URL

The logs show it's trying to connect to `localhost:5432/portfolio` instead of using `DATABASE_URL`.

1. Railway → **Variables** tab
2. Check if `DATABASE_URL` exists
3. If missing:
   - Click **"+ New Variable"**
   - Click **"Add Reference"**
   - Select your **Postgres** database
   - Choose **`DATABASE_URL`**
   - Save

### Step 4: Redeploy

After adding variables:
1. Railway will auto-redeploy
2. Or manually trigger: **Deployments** → **Redeploy**
3. Check logs - should see:
   - `✅ Database connection established successfully.`
   - `✅ API running on http://localhost:4000`
   - No more `JWT_SECRET` errors

## Quick Checklist

- [ ] Add `JWT_SECRET` variable in Railway
- [ ] Verify `DATABASE_URL` is set (link to Postgres)
- [ ] Redeploy backend
- [ ] Check logs - no errors
- [ ] Test: `https://your-railway-url/health` → `{"ok":true}`

## After Fixing

Once backend is working:
1. Get your Railway URL
2. Update `netlify.toml` with the real URL
3. Frontend should connect successfully!

# Force Port 4000 - Railway Still Using 8080

## The Problem
Even after setting `PORT=4000`, Railway is still using port 8080. Railway might be automatically setting PORT=8080.

## Solution: Check Railway Settings

### Step 1: Verify PORT Variable is Set

1. Railway → Your backend service → **Variables** tab
2. Look for `PORT` in the list
3. Check its value - should be `4000`
4. If it's `8080` or missing:
   - Click on it to edit
   - Change to `4000`
   - Save

### Step 2: Check Railway Networking Port

1. Railway → Settings → **Networking**
2. Look at the "Generate Service Domain" section
3. Check what port is shown there
4. If it says port `8080`:
   - You might need to regenerate the domain with port 4000
   - Or Railway might be auto-detecting the port

### Step 3: Check if PORT is Being Overridden

Railway might have a system variable `PORT=8080` that's overriding yours. Check:

1. Variables tab → Look for any `PORT` variable
2. If there are multiple, the system one might be taking precedence
3. Try deleting and re-adding `PORT=4000`

### Step 4: Alternative - Update Railway Networking

If Railway is forcing 8080, you might need to:

1. Railway → Settings → **Networking**
2. Look for port configuration
3. Change it to `4000` if possible
4. Or regenerate the domain with the correct port

### Step 5: Check Build/Deploy Settings

1. Railway → Settings → **Deploy**
2. Check if there's a port setting there
3. Make sure it's set to `4000`

## Quick Fix: Update Server to Log PORT

Let's verify what PORT the server is actually receiving:

The server code should log the PORT it's using. Check the logs - if it says 8080, Railway is setting it to 8080.

## Most Likely Solution

Railway might be automatically setting `PORT=8080` as a system variable. Try:

1. **Delete** any existing `PORT` variable
2. **Add new** `PORT` variable with value `4000`
3. **Redeploy**
4. Check logs - should now show port 4000

Or, if Railway Networking shows port 4000 but server uses 8080, the issue is that Railway's system PORT is overriding yours. You might need to contact Railway support or check if there's a way to override system variables.

## Alternative: Accept Port 8080

If Railway is forcing 8080, you could:
1. Update Railway Networking to use port 8080
2. Or update your code to always use Railway's PORT (which it already does)

But since Railway Networking shows 4000, we need to match that.

# How to Change AWS Amplify Region

## Important Note

**You cannot directly change the region of an existing Amplify app.** Once an app is created in a region, it stays in that region.

## Your Options

### Option 1: Create a New App in London Region (Recommended)

If you need the app in Europe (London), you'll need to create a new Amplify app:

1. **Go to AWS Amplify Console:**
   - Visit: https://console.aws.amazon.com/amplify

2. **Switch Region:**
   - Click on the region dropdown (currently shows "Europe (Stockholm)")
   - Select "Europe (London)" or "eu-west-2"

3. **Create New App:**
   - Click "New app" → "Host web app"
   - Connect your GitHub repository
   - Select the same branch (main)
   - Configure build settings (use the `amplify.yml` file we created)
   - Deploy

4. **After New App is Created:**
   - You can delete the old app in Stockholm if you want
   - Update any URLs/references to point to the new London app

### Option 2: Keep Current Region (Easier)

If the region doesn't matter much for your use case:
- **Keep using Stockholm** - it works fine and is close to London
- The performance difference is minimal
- No need to recreate the app

### Option 3: Use CloudFront (Global Distribution)

If you want global performance:
- Amplify automatically uses CloudFront CDN
- Your app is distributed globally regardless of the region
- Users get fast access from anywhere

---

## Steps to Create New App in London

1. **In AWS Console:**
   - Click the region selector (top right)
   - Choose "Europe (London)" or search for "eu-west-2"

2. **Go to Amplify:**
   - Navigate to AWS Amplify service
   - Click "New app" → "Host web app"

3. **Connect Repository:**
   - Choose GitHub
   - Authorize if needed
   - Select: `Munafadal/muna-portfolio-frontend`
   - Select branch: `main`

4. **Configure Build:**
   - Amplify should auto-detect the `amplify.yml` file
   - Or manually set:
     - Build command: `cd muna-portfolio-frontend && npm install && npm run build`
     - Output directory: `muna-portfolio-frontend/dist`

5. **Review and Deploy:**
   - Review settings
   - Click "Save and deploy"

---

## Current App Info

- **Current Region:** Europe (Stockholm) - eu-north-1
- **App ID:** d1d0806n6use35
- **Domain:** https://main.d1d0806n6use35.amplifyapp.com

---

## Recommendation

**Unless you have a specific requirement for London region**, I'd recommend:
- **Keep the Stockholm app** - it's working fine
- The region mainly affects where your backend resources are hosted
- For a static frontend, the region doesn't matter much due to CDN
- You'd need to recreate everything in London

If you do need London, follow Option 1 above to create a new app.

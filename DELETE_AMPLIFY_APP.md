# How to Delete Amplify App in Stockholm

## Steps to Delete

1. **Go to AWS Amplify Console:**
   - Make sure you're in the **Europe (Stockholm)** region
   - Click the region dropdown (top right) and select "Europe (Stockholm)" or "eu-north-1"

2. **Select Your App:**
   - Click on "muna-portfolio-frontend" app
   - Or go directly to: https://console.aws.amazon.com/amplify/home?region=eu-north-1

3. **Go to App Settings:**
   - In the left sidebar, click on **"App settings"**
   - Then click on **"General"** (should be selected by default)

4. **Delete the App:**
   - Scroll down to the bottom of the page
   - Look for the **"Danger zone"** or **"Delete app"** section
   - Click the **"Delete app"** button

5. **Confirm Deletion:**
   - You'll be asked to type the app name to confirm: `muna-portfolio-frontend`
   - Type it exactly as shown
   - Click **"Delete"** or **"Confirm"**

6. **Wait for Deletion:**
   - The app and all its resources will be deleted
   - This may take a few minutes

---

## Important Notes

⚠️ **Warning:** Deleting an app will:
- Delete all branches and deployments
- Delete the app domain (you'll lose the URL)
- Delete all build history
- **This cannot be undone!**

✅ **Before deleting, make sure:**
- You have a new app set up in London (if you want to keep hosting)
- You've saved any important configuration
- You don't need the current app anymore

---

## Alternative: Just Stop Using It

If you're not sure, you can:
- Just leave it there (it won't cost much if not actively used)
- Create the new London app first
- Delete Stockholm later once you've confirmed London works

---

## Quick Path

1. **Amplify Console** → Select "muna-portfolio-frontend"
2. **Left sidebar** → "App settings"
3. **Scroll down** → "Delete app" button
4. **Type app name** → Confirm deletion

That's it! The app will be permanently deleted.

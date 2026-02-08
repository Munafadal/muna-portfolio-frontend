# Fix: Repository Not Appearing in Amplify

## Step-by-Step Solution

### Step 1: Update GitHub Permissions

1. **Click "Update GitHub permissions"** in the purple banner
2. This should open a GitHub page
3. If it doesn't open, manually go to:
   - https://github.com/settings/installations
   - Find "AWS Amplify (eu-west-2)" or similar
   - Click "Configure"

### Step 2: Grant Repository Access

1. **Select "Only select repositories"**
2. **Click "Select repositories"** dropdown
3. **Search for:** `muna-portfolio-frontend`
4. **Check the box** next to it
5. **Click "Save"** (green button)

### Step 3: If Repository Still Doesn't Appear

Try these:

#### Option A: Select "All repositories"
1. In GitHub settings, select **"All repositories"** (first radio button)
2. Click **"Save"**
3. Go back to Amplify and refresh

#### Option B: Check Repository Visibility
1. Go to: https://github.com/Munafadal/muna-portfolio-frontend
2. Make sure the repository exists and is accessible
3. If it's private, make sure you're logged into the correct GitHub account

#### Option C: Refresh in Amplify
1. Click the **refresh icon** (circular arrow) next to "Select a repository"
2. Wait a few seconds
3. Try clicking the dropdown again

#### Option D: Push a Commit
The banner says: "If your repository still doesn't appear, push a commit and click the refresh button"

1. Make a small change and push:
   ```bash
   cd /home/mofad/luulsolutions/portfolio
   git add .
   git commit -m "Trigger Amplify refresh"
   git push
   ```
2. Wait 30 seconds
3. Go back to Amplify
4. Click the refresh icon
5. Try the dropdown again

---

## Alternative: Use Repository URL Directly

If the dropdown still doesn't work:

1. **Cancel this setup**
2. **Try connecting via URL:**
   - In Amplify, look for "Deploy without Git" or "Deploy from URL"
   - Enter: `https://github.com/Munafadal/muna-portfolio-frontend`

---

## Quick Checklist

- [ ] Clicked "Update GitHub permissions"
- [ ] Selected "Only select repositories" or "All repositories"
- [ ] Found and selected `muna-portfolio-frontend` in GitHub
- [ ] Clicked "Save" in GitHub settings
- [ ] Returned to Amplify page
- [ ] Clicked refresh icon in Amplify
- [ ] Tried clicking repository dropdown again
- [ ] Pushed a commit (if still not working)

---

## Still Not Working?

If nothing works:

1. **Check if repository exists:**
   - Visit: https://github.com/Munafadal/muna-portfolio-frontend
   - Make sure you can see it

2. **Try different GitHub account:**
   - Make sure you're using the same GitHub account that owns the repository

3. **Contact Support:**
   - Use the "Support" link in Amplify console
   - Or try creating the app in a different way

# Netlify Deployment Instructions

## Important: Manual Configuration Required

Netlify is auto-detecting Remix framework incorrectly. You need to manually configure the build settings in Netlify Dashboard:

### Steps:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** > **Build & deploy** > **Build settings**
3. **Override** the following settings:

   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (leave empty or set to root)

4. **Clear build cache** and redeploy

### Environment Variables

Add these in **Site settings** > **Environment variables**:

- `VITE_API_BASE_URL` = Your backend API URL (e.g., `https://your-api.herokuapp.com`)
- `VITE_BACKEND_URL` = Your backend URL (e.g., `https://your-api.herokuapp.com`)

### Update netlify.toml

Edit `netlify.toml` and replace `https://your-backend-url.com` with your actual backend URL in the API redirect section.

### Why this is needed

Netlify's auto-detection is incorrectly identifying this as a Remix project. The manual configuration ensures it uses the correct Vite build process.

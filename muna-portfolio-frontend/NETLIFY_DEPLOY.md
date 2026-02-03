# Netlify Deployment Guide

## Prerequisites
- Your backend API should be deployed and accessible (e.g., on Heroku, Railway, Render, etc.)
- You have a Netlify account

## Deployment Steps

### 1. Build Settings in Netlify
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 (or higher)

### 2. Environment Variables
In Netlify dashboard, go to Site settings > Environment variables and add:

```
VITE_API_BASE_URL=https://your-backend-api-url.com
VITE_BACKEND_URL=https://your-backend-api-url.com
```

**Important**: Replace `https://your-backend-api-url.com` with your actual backend URL.

### 3. Update netlify.toml
Edit `netlify.toml` and update the API proxy redirect:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-api-url.com/api/:splat"
  status = 200
  force = true
```

### 4. Deploy
- Connect your repository to Netlify
- Netlify will automatically detect the build settings from `netlify.toml`
- Deploy!

## Notes
- The `_redirects` file in the `public` folder handles SPA routing
- API calls will be proxied through Netlify if you set up the redirect
- Make sure CORS is configured on your backend to allow requests from your Netlify domain

# How to Find Your Profile ID

Your backend API is at: **`https://muna-portfolio-frontend-production.up.railway.app`**

## Method 1: Using Swagger UI (Easiest) 🎯

1. **Go to Swagger UI:**
   - Open: `https://muna-portfolio-frontend-production.up.railway.app/api/docs`

2. **Find the GET endpoint:**
   - Look for `GET /api/profile`
   - Click on it to expand

3. **Execute the request:**
   - Click the **"Try it out"** button
   - Click the **"Execute"** button

4. **Find your ID:**
   - Look at the response body
   - You'll see a JSON object with an `id` field at the top
   - Example: `"id": 1`

---

## Method 2: Using Browser Console (Quick)

1. **Open your browser console:**
   - Press `F12` or right-click → Inspect → Console tab

2. **Run this command:**
   ```javascript
   fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile')
     .then(res => res.json())
     .then(data => console.log('Profile ID:', data.id, '\nFull Profile:', data));
   ```

3. **Check the console output:**
   - You'll see: `Profile ID: 1` (or whatever your ID is)
   - The full profile data will also be shown

---

## Method 3: Using curl (Terminal)

Run this command in your terminal:

```bash
curl https://muna-portfolio-frontend-production.up.railway.app/api/profile
```

The response will be JSON. Look for the `"id"` field at the beginning:

```json
{
  "id": 1,
  "name": "Muna Osman",
  "email": "your.email@example.com",
  ...
}
```

---

## Method 4: Visit the URL Directly

Simply open this URL in your browser:

```
https://muna-portfolio-frontend-production.up.railway.app/api/profile
```

You'll see the JSON response. The `id` field is usually the first field in the response.

---

## What if I get "No profile found"?

If you see `{"message": "No profile found"}`, it means you need to create a profile first.

### Create a profile using Swagger UI:

1. Go to: `https://muna-portfolio-frontend-production.up.railway.app/api/docs`
2. Find `POST /api/profile`
3. Click "Try it out"
4. Fill in the required fields (at minimum: `name` and `email`)
5. Click "Execute"
6. The response will include your new profile with an `id`

### Or use browser console:

```javascript
fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Muna Osman",
    email: "your.email@example.com",
    bio: "Your bio here"
  })
})
.then(res => res.json())
.then(data => console.log('Profile created! ID:', data.id));
```

---

## Quick Reference

- **Swagger UI:** `https://muna-portfolio-frontend-production.up.railway.app/api/docs`
- **Get Profile:** `https://muna-portfolio-frontend-production.up.railway.app/api/profile`
- **Profile ID is usually:** `1` (if it's your first profile)

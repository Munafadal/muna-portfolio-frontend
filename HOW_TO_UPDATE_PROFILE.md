# How to Update Your Profile

Your backend API is deployed at: **`https://muna-portfolio-frontend-production.up.railway.app`**

## Method 1: Using Swagger UI (Easiest - Recommended) 🎯

1. **Open Swagger UI:**
   - Go to: `https://muna-portfolio-frontend-production.up.railway.app/api/docs`
   - This is an interactive API documentation interface

2. **Find your profile ID:**
   - Click on `GET /api/profile` → Click "Try it out" → Click "Execute"
   - Look at the response - note the `id` field (usually `1`)

3. **Update your profile:**
   - Scroll down to `PUT /api/profile/{id}`
   - Click "Try it out"
   - Enter your profile ID in the `id` field (e.g., `1`)
   - Click in the "Request body" box
   - Update the JSON with your new information
   - Click "Execute"

**Example Request Body:**
```json
{
  "name": "Muna Osman",
  "email": "your.email@example.com",
  "bio": "Your updated bio here",
  "location": "Your City, Country",
  "nationality": "Your Nationality",
  "phoneNumber": "+1234567890",
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourusername",
  "twitter": "https://twitter.com/yourusername",
  "cv": "https://your-cv-url.com/cv.pdf",
  "skills": "Node.js, TypeScript, React, PostgreSQL",
  "languages": "English, Arabic",
  "availability": "Available immediately",
  "noticePeriod": "2 weeks",
  "willingToRelocate": true,
  "ownACar": false,
  "haveDrivingLicence": true
}
```

---

## Method 2: Using Browser Console (Quick Test)

1. **Open your browser console** (F12 or Right-click → Inspect → Console)

2. **First, get your profile ID:**
   ```javascript
   fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile')
     .then(res => res.json())
     .then(data => console.log('Profile ID:', data.id));
   ```

3. **Update your profile** (replace `1` with your actual profile ID):
   ```javascript
   fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile/1', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       name: "Muna Osman",
       email: "your.email@example.com",
       bio: "Your updated bio",
       location: "Your City",
       github: "https://github.com/yourusername",
       linkedin: "https://linkedin.com/in/yourusername",
       skills: "Node.js, TypeScript, React",
       languages: "English, Arabic"
     })
   })
   .then(res => res.json())
   .then(data => console.log('Updated:', data))
   .catch(err => console.error('Error:', err));
   ```

---

## Method 3: Using curl (Terminal/Command Line)

1. **Get your profile ID first:**
   ```bash
   curl https://muna-portfolio-frontend-production.up.railway.app/api/profile
   ```
   Note the `id` from the response.

2. **Update your profile** (replace `1` with your actual profile ID):
   ```bash
   curl -X PUT https://muna-portfolio-frontend-production.up.railway.app/api/profile/1 \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Muna Osman",
       "email": "your.email@example.com",
       "bio": "Your updated bio",
       "location": "Your City",
       "github": "https://github.com/yourusername",
       "linkedin": "https://linkedin.com/in/yourusername",
       "skills": "Node.js, TypeScript, React",
       "languages": "English, Arabic"
     }'
   ```

---

## Available Profile Fields

You can update any of these fields:

### Required Fields:
- `name` (string) - Your full name
- `email` (string) - Your email address

### Optional Fields:
- `bio` (string) - Your biography/description
- `location` (string) - Your location
- `nationality` (string) - Your nationality
- `availability` (string) - Your availability status
- `dateOfBirth` (string) - Your date of birth (format: "YYYY-MM-DD")
- `phoneNumber` (string) - Your phone number
- `address` (string) - Your address
- `github` (string) - Your GitHub profile URL
- `twitter` (string) - Your Twitter profile URL
- `linkedin` (string) - Your LinkedIn profile URL
- `cv` (string) - Your CV URL (or use `/api/cv/upload` endpoint)
- `expectedSalery` (number) - Expected salary
- `ownACar` (boolean) - Do you own a car? (true/false)
- `haveDrivingLicence` (boolean) - Do you have a driving license? (true/false)
- `noticePeriod` (string) - Your notice period
- `immigrationStatus` (string) - Your immigration status
- `references` (string) - References information
- `willingToRelocate` (boolean) - Willing to relocate? (true/false)
- `languages` (string) - Comma-separated list (e.g., "English, Arabic")
- `skills` (string) - Comma-separated list (e.g., "Node.js, TypeScript, React")

---

## Tips

1. **You don't need to include all fields** - Only include the fields you want to update
2. **Partial updates are supported** - You can update just one field if needed
3. **Check the response** - The API will return the updated profile
4. **Refresh your frontend** - After updating, refresh your portfolio website to see changes

---

## Troubleshooting

### Error: "Profile not found"
- Make sure you're using the correct profile ID
- First, get your profile with `GET /api/profile` to find the ID

### Error: "Validation error"
- Make sure `name` and `email` are included and valid
- Email must be in valid format (e.g., `user@example.com`)

### Changes not showing on website
- Wait a few seconds and refresh the page
- Clear your browser cache if needed
- Check that your frontend is connected to the correct backend URL

---

## Quick Reference

- **Swagger UI:** `https://muna-portfolio-frontend-production.up.railway.app/api/docs`
- **Get Profile:** `GET https://muna-portfolio-frontend-production.up.railway.app/api/profile`
- **Update Profile:** `PUT https://muna-portfolio-frontend-production.up.railway.app/api/profile/{id}`

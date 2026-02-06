# Create Profile - Simple Methods

## Method 1: Using Terminal (curl) - Easiest!

Open your terminal and run:

```bash
curl -X POST https://muna-portfolio-frontend-production.up.railway.app/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Muna Osman",
    "email": "muna@example.com",
    "bio": "Software Development Engineer",
    "location": "London, UK",
    "nationality": "Somali / British",
    "availability": "Immediately available",
    "github": "https://github.com/Munafadal",
    "linkedin": "https://linkedin.com/in/your-linkedin",
    "expectedSalery": 65000,
    "ownACar": false,
    "haveDrivingLicence": true,
    "noticePeriod": "0-1 month",
    "immigrationStatus": "Right to work in the UK",
    "willingToRelocate": true,
    "languages": "English, Arabic, Somali",
    "skills": "React, TypeScript, Node.js, Vite, Tailwind CSS, REST APIs"
  }'
```

**That's it!** You should see your profile data returned.

## Method 2: Using Browser Console (Alternative)

If F12 doesn't work, try:

1. **Right-click** anywhere on the page
2. Click **"Inspect"** or **"Inspect Element"**
3. Click the **"Console"** tab at the top
4. Paste this code and press Enter:

```javascript
fetch('https://muna-portfolio-frontend-production.up.railway.app/api/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Muna Osman",
    email: "muna@example.com",
    bio: "Software Development Engineer",
    location: "London, UK",
    nationality: "Somali / British",
    availability: "Immediately available",
    github: "https://github.com/Munafadal",
    linkedin: "https://linkedin.com/in/your-linkedin",
    expectedSalery: 65000,
    ownACar: false,
    haveDrivingLicence: true,
    noticePeriod: "0-1 month",
    immigrationStatus: "Right to work in the UK",
    willingToRelocate: true,
    languages: "English, Arabic, Somali",
    skills: "React, TypeScript, Node.js, Vite, Tailwind CSS, REST APIs"
  })
})
.then(response => response.json())
.then(data => {
  console.log('Profile created:', data);
  alert('Profile created successfully!');
})
.catch(error => {
  console.error('Error:', error);
  alert('Error: ' + error.message);
});
```

## Method 3: Using Postman or Insomnia

1. **Download Postman** (free): https://www.postman.com/downloads/
2. **Create new request:**
   - Method: **POST**
   - URL: `https://muna-portfolio-frontend-production.up.railway.app/api/profile`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Muna Osman",
     "email": "muna@example.com",
     "bio": "Software Development Engineer",
     "location": "London, UK",
     "nationality": "Somali / British",
     "availability": "Immediately available",
     "github": "https://github.com/Munafadal",
     "linkedin": "https://linkedin.com/in/your-linkedin",
     "expectedSalery": 65000,
     "ownACar": false,
     "haveDrivingLicence": true,
     "noticePeriod": "0-1 month",
     "immigrationStatus": "Right to work in the UK",
     "willingToRelocate": true,
     "languages": "English, Arabic, Somali",
     "skills": "React, TypeScript, Node.js, Vite, Tailwind CSS, REST APIs"
   }
   ```
3. **Click Send**

## After Creating Profile

1. **Test it worked:**
   - Open: `https://muna-portfolio-frontend-production.up.railway.app/api/profile`
   - Should see your profile data (not 404)

2. **Test your frontend:**
   - Visit your Netlify site
   - Profile page should now load your data!

## Recommended: Use Method 1 (curl)

The curl command is the simplest - just copy, paste, and run in terminal!

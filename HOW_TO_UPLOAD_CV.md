# How to Upload Your CV

Your backend API supports CV uploads at: `https://muna-portfolio-frontend-production.up.railway.app/api/cv/upload`

## Supported File Types
- ✅ PDF files (`.pdf`)
- ✅ Word documents (`.docx`, `.doc`)
- ❌ Maximum file size: 10MB

---

## Method 1: Using Swagger UI (Easiest) 🎯

1. **Go to Swagger UI:**
   - Visit: `https://muna-portfolio-frontend-production.up.railway.app/api/docs`

2. **Find the upload endpoint:**
   - Scroll down to `POST /api/cv/upload`
   - Click on it to expand

3. **Upload your CV:**
   - Click the **"Try it out"** button
   - Click **"Choose File"** or the file input
   - Select your CV file (PDF or Word document)
   - Click **"Execute"**

4. **Check the response:**
   - You should see: `"message": "CV uploaded successfully"`
   - The `cv` field will show the path to your uploaded file

---

## Method 2: Using curl (Terminal/Command Line)

Replace `path/to/your/cv.pdf` with the actual path to your CV file:

```bash
curl -X POST https://muna-portfolio-frontend-production.up.railway.app/api/cv/upload \
  -H "accept: application/json" \
  -F "cv=@/path/to/your/cv.pdf"
```

**Example:**
```bash
curl -X POST https://muna-portfolio-frontend-production.up.railway.app/api/cv/upload \
  -H "accept: application/json" \
  -F "cv=@/home/mofad/Documents/Muna_Osman_CV.pdf"
```

**For Windows (PowerShell):**
```powershell
curl.exe -X POST https://muna-portfolio-frontend-production.up.railway.app/api/cv/upload `
  -H "accept: application/json" `
  -F "cv=@C:\Users\YourName\Documents\CV.pdf"
```

---

## Method 3: Using Browser Console (JavaScript)

This method requires creating a form with a file input. Here's a quick way:

1. **Open your browser console** (F12)
2. **Create a file input and upload:**

```javascript
// Create a file input
const input = document.createElement('input');
input.type = 'file';
input.accept = '.pdf,.doc,.docx';

// When file is selected, upload it
input.onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('cv', file);

  try {
    const res = await fetch('https://muna-portfolio-frontend-production.up.railway.app/api/cv/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await res.json();
    console.log('✅ CV uploaded:', data);
  } catch (err) {
    console.error('❌ Error:', err);
  }
};

// Trigger file picker
input.click();
```

---

## Method 4: Using Postman or Similar Tools

1. **Create a new POST request:**
   - URL: `https://muna-portfolio-frontend-production.up.railway.app/api/cv/upload`
   - Method: `POST`

2. **Set up the request:**
   - Go to "Body" tab
   - Select "form-data"
   - Add a key: `cv` (type: File)
   - Click "Select Files" and choose your CV

3. **Send the request:**
   - Click "Send"
   - Check the response

---

## Method 5: Add External CV Link (Instead of Uploading)

If your CV is hosted elsewhere (Google Drive, Dropbox, etc.), you can add the link directly:

1. **Go to Swagger UI:**
   - Visit: `https://muna-portfolio-frontend-production.up.railway.app/api/docs`

2. **Update your profile:**
   - Find `PUT /api/profile/{id}`
   - Click "Try it out"
   - Enter your profile ID (e.g., `1`)
   - In the request body, add:
     ```json
     {
       "cv": "https://drive.google.com/file/d/your-file-id/view?usp=sharing"
     }
     ```
   - Click "Execute"

**Note:** Make sure the link is publicly accessible (not private).

---

## After Uploading

1. **Verify the upload:**
   - Visit: `https://muna-portfolio-frontend-production.up.railway.app/api/profile`
   - Check that the `cv` field shows your file path

2. **View your CV:**
   - Go to your portfolio website
   - Navigate to the `/cv` page
   - You should see your CV with preview/download options

---

## Troubleshooting

### Error: "No file uploaded"
- Make sure you selected a file before clicking Execute
- Check that the file field name is `cv` (not `file` or `document`)

### Error: "Only PDF and Word document files are allowed"
- Make sure your file is `.pdf`, `.docx`, or `.doc`
- Try converting your file to PDF if it's in another format

### Error: "File too large"
- Maximum file size is 10MB
- Compress your PDF or reduce the file size

### Error: "No profile found"
- You need to create a profile first
- Use `POST /api/profile` to create one

### CV not showing on website
- Wait a few seconds and refresh the page
- Check that the CV path is correct in your profile
- Make sure the backend is serving static files from `/uploads`

---

## Quick Reference

- **Upload Endpoint:** `POST https://muna-portfolio-frontend-production.up.railway.app/api/cv/upload`
- **Swagger UI:** `https://muna-portfolio-frontend-production.up.railway.app/api/docs`
- **Get Profile:** `GET https://muna-portfolio-frontend-production.up.railway.app/api/profile`
- **Supported Formats:** PDF, DOCX, DOC
- **Max File Size:** 10MB

---

## Recommended: Use Swagger UI

The easiest way is to use Swagger UI:
1. Go to the docs page
2. Find `POST /api/cv/upload`
3. Click "Try it out"
4. Choose your file
5. Click "Execute"

That's it! Your CV will be uploaded and linked to your profile automatically.

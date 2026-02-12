# How to Add/Update Projects

Your portfolio now has a full backend API for managing projects! You can add, update, and delete projects through the API.

## Quick Start: Using Swagger UI (Easiest)

### 1. Open Swagger UI
Visit: `https://muna-portfolio-frontend-production.up.railway.app/api/docs`

### 2. Find Projects Endpoints
Look for the `/api/projects` section with these endpoints:
- `GET /api/projects` - View all projects
- `POST /api/projects` - Create a new project
- `PUT /api/projects/{id}` - Update a project
- `DELETE /api/projects/{id}` - Delete a project

### 3. Add a New Project

1. **Click on `POST /api/projects`**
2. **Click "Try it out"**
3. **Fill in the request body:**

```json
{
  "title": "My Awesome Project",
  "description": "A detailed description of what this project does and why it's cool.",
  "tech": "React, TypeScript, Node.js, PostgreSQL",
  "highlight": "Full Stack · Web App",
  "url": "https://myproject.com",
  "githubUrl": "https://github.com/username/project",
  "imageUrl": "https://example.com/image.jpg",
  "featured": true,
  "order": 0
}
```

**Required fields:**
- `title` - Project name
- `description` - Project description
- `tech` - Technologies used (comma-separated string)

**Optional fields:**
- `highlight` - Category tag (e.g., "Frontend · UI/UX", "Data · APIs")
- `url` - Live project URL
- `githubUrl` - GitHub repository URL
- `imageUrl` - Project screenshot/image URL
- `featured` - Boolean (true/false) - whether to highlight
- `order` - Number for sorting (lower = appears first)

4. **Click "Execute"**
5. **Check the response** - You should see your new project with an `id`

### 4. Update an Existing Project

1. **First, get all projects** using `GET /api/projects` to find the project `id`
2. **Click on `PUT /api/projects/{id}`**
3. **Click "Try it out"**
4. **Enter the project `id`** in the path parameter
5. **Update the request body** with new values
6. **Click "Execute"**

### 5. Delete a Project

1. **Click on `DELETE /api/projects/{id}`**
2. **Click "Try it out"**
3. **Enter the project `id`**
4. **Click "Execute"**

---

## Using curl (Command Line)

### Add a Project
```bash
curl -X POST \
  https://muna-portfolio-frontend-production.up.railway.app/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Awesome Project",
    "description": "A detailed description of what this project does.",
    "tech": "React, TypeScript, Node.js",
    "highlight": "Full Stack · Web App",
    "url": "https://myproject.com",
    "githubUrl": "https://github.com/username/project",
    "featured": true,
    "order": 0
  }'
```

### Update a Project
```bash
curl -X PUT \
  https://muna-portfolio-frontend-production.up.railway.app/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Project Title",
    "description": "Updated description",
    "tech": "React, TypeScript, Node.js, PostgreSQL"
  }'
```

### Get All Projects
```bash
curl https://muna-portfolio-frontend-production.up.railway.app/api/projects
```

### Delete a Project
```bash
curl -X DELETE \
  https://muna-portfolio-frontend-production.up.railway.app/api/projects/1
```

---

## Using Browser Console

Open your browser console (F12) and run:

```javascript
// Get all projects
fetch('https://muna-portfolio-frontend-production.up.railway.app/api/projects')
  .then(res => res.json())
  .then(data => console.log(data));

// Add a new project
fetch('https://muna-portfolio-frontend-production.up.railway.app/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "My Awesome Project",
    description: "A detailed description.",
    tech: "React, TypeScript, Node.js",
    highlight: "Full Stack · Web App",
    url: "https://myproject.com",
    githubUrl: "https://github.com/username/project",
    featured: true,
    order: 0
  })
})
  .then(res => res.json())
  .then(data => console.log('Created:', data));
```

---

## Project Field Guide

### `title` (Required)
- Project name
- Example: `"Portfolio Website"`

### `description` (Required)
- Detailed description of the project
- Example: `"Personal portfolio built with React, Vite, TypeScript, and Tailwind"`

### `tech` (Required)
- Technologies used (comma-separated)
- Example: `"React, Vite, TypeScript, Tailwind"`

### `highlight` (Optional)
- Category/tag for the project
- Examples: `"Frontend · UI/UX"`, `"Data · APIs"`, `"Full Stack"`, `"Productivity"`

### `url` (Optional)
- Live project URL
- Example: `"https://munaosman.com"`

### `githubUrl` (Optional)
- GitHub repository URL
- Example: `"https://github.com/Munafadal/portfolio"`

### `imageUrl` (Optional)
- Project screenshot/image URL
- Example: `"https://example.com/screenshot.jpg"`

### `featured` (Optional)
- Boolean: `true` or `false`
- Whether to highlight this project
- Default: `false`

### `order` (Optional)
- Number for sorting (lower numbers appear first)
- Default: `0`

---

## Example Projects

Here are some example projects you can add:

### Example 1: Portfolio
```json
{
  "title": "Portfolio",
  "description": "Personal portfolio built with React, Vite, TypeScript, and Tailwind, styled with a custom Divi-inspired dark theme.",
  "tech": "React, Vite, TypeScript, Tailwind",
  "highlight": "Frontend · UI/UX",
  "url": "https://munaosman.com",
  "githubUrl": "https://github.com/Munafadal/muna-portfolio-frontend",
  "featured": true,
  "order": 0
}
```

### Example 2: Geo Addressing System
```json
{
  "title": "Geo Addressing System",
  "description": "Tools for managing and searching location data, with a focus on accuracy and usability.",
  "tech": "React, Node.js, PostgreSQL",
  "highlight": "Data · APIs",
  "url": null,
  "githubUrl": null,
  "featured": false,
  "order": 1
}
```

### Example 3: Internal Tools
```json
{
  "title": "Internal Tools",
  "description": "Dashboards and internal tools to streamline workflows and help teams move faster.",
  "tech": "React, TypeScript, REST APIs",
  "highlight": "Productivity",
  "url": null,
  "githubUrl": null,
  "featured": false,
  "order": 2
}
```

---

## Tips

1. **Start with Swagger UI** - It's the easiest way to test and add projects
2. **Use `order` field** - Set lower numbers for projects you want to show first
3. **Add URLs** - Include `url` and `githubUrl` to make projects clickable
4. **Use `highlight`** - Add category tags to organize projects
5. **Set `featured: true`** - For your best projects (if you implement featured filtering)

---

## After Adding Projects

1. **Visit your portfolio:** `https://munaosman.com/projects`
2. **Refresh the page** - Your new projects should appear!
3. **Projects are sorted by `order`** (ascending), then by creation date

---

## Troubleshooting

- **404 Error**: Make sure the backend is running on Railway
- **500 Error**: Check that all required fields are provided
- **Projects not showing**: Clear browser cache and refresh
- **Database issues**: The projects table will be created automatically on first use

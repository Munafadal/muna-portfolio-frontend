#!/bin/bash

# Script to add projects to the database
# Run this after deploying the backend

BACKEND_URL="https://muna-portfolio-frontend-production.up.railway.app"

echo "Adding Beauty Hub project..."
curl -X POST "$BACKEND_URL/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beauty Hub",
    "description": "A beauty and cosmetics platform built with modern web technologies.",
    "tech": "React, TypeScript, Vite, Tailwind",
    "highlight": "Frontend · E-commerce",
    "order": 0
  }'

echo -e "\n\nAdding Portfolio Website project..."
curl -X POST "$BACKEND_URL/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Portfolio Website",
    "description": "Personal portfolio website showcasing projects and skills.",
    "tech": "React, TypeScript, Vite, Tailwind",
    "highlight": "Frontend · Portfolio",
    "order": 1
  }'

echo -e "\n\n✅ Projects added successfully!"

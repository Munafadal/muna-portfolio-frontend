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

echo -e "\n\nAdding Portfolio project..."
curl -X POST "$BACKEND_URL/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Portfolio",
    "description": "Personal portfolio built with React, Vite, TypeScript, and Tailwind, styled with a custom Divi-inspired dark theme.",
    "tech": "React, Vite, TypeScript, Tailwind",
    "highlight": "Frontend · UI/UX",
    "order": 2
  }'

echo -e "\n\nAdding Geo Addressing System project..."
curl -X POST "$BACKEND_URL/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Geo Addressing System",
    "description": "Tools for managing and searching location data, with a focus on accuracy and usability.",
    "tech": "React, Node, PostgreSQL",
    "highlight": "Data · APIs",
    "order": 3
  }'

echo -e "\n\nAdding Internal Tools project..."
curl -X POST "$BACKEND_URL/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Internal Tools",
    "description": "Dashboards and internal tools to streamline workflows and help teams move faster.",
    "tech": "React, TypeScript, REST APIs",
    "highlight": "Productivity",
    "order": 4
  }'

echo -e "\n\n✅ All projects added successfully!"

curl -X POST http://localhost:3000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Muna Osman",
    "email": "muna.osman@example.com",
    "bio": "Software Development Engineer with a passion for building scalable systems and clean UI.",
    "location": "London, UK",
    "nationality": "British",
    "availability": "Open to opportunities",
    "dateOfBirth": "1998-06-15",
    "phoneNumber": "+44 7000 000000",
    "address": "London, United Kingdom",
    "github": "https://github.com/Munafadal",
    "twitter": "https://twitter.com/muna",
    "linkedin": "https://linkedin.com/in/muna-osman",
    "expectedSalery": 65000,
    "ownACar": false,
    "haveDrivingLicence": true,
    "noticePeriod": "1 month",
    "immigrationStatus": "Citizen",
    "references": "Available upon request",
    "willingToRelocate": true,
    "languages": "English, Arabic",
    "skills": "Node.js, TypeScript, React, Sequelize"
  }'

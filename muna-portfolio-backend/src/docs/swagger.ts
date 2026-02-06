import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Muna Portfolio API",
      version: "1.0.0",
      description: "Backend API for portfolio profile data",
    },
    servers: [
      { 
        url: process.env.RAILWAY_PUBLIC_DOMAIN 
          ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` 
          : process.env.BACKEND_URL || "http://localhost:4000",
        description: "Production server"
      },
      { 
        url: "http://localhost:4000",
        description: "Local development server"
      }
],

  },
  apis: ["./src/routes/*.ts"], // reads JSDoc from routes
});

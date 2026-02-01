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
  { url: "http://localhost:4000" }
],

  },
  apis: ["./src/routes/*.ts"], // reads JSDoc from routes
});

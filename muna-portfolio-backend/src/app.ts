import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

import { profileRouter } from "./routes/profile.routes"; // or profileRoutes
import { authRouter } from "./routes/auth.routes";
import { cvRouter } from "./routes/cvRoutes";
import { projectRouter } from "./routes/project.routes";

export const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// JSON parser - handle empty bodies gracefully
app.use((req, res, next) => {
  // Skip parsing for GET, HEAD, OPTIONS, DELETE (no body expected)
  if (["GET", "HEAD", "OPTIONS", "DELETE"].includes(req.method)) {
    return next();
  }
  
  const contentType = req.get("Content-Type");
  const contentLength = req.get("Content-Length");
  
  // If no content-type or not JSON, skip parsing
  if (!contentType || !contentType.includes("application/json")) {
    return next();
  }
  
  // If content-length is 0 or missing, treat as empty body
  if (contentLength === "0" || !contentLength) {
    req.body = {};
    return next();
  }
  
  // Use JSON parser with error handling
  express.json()(req, res, (err) => {
    if (err) {
      // If it's an empty/invalid body error, treat as empty object for POST/PUT
      if (err.type === "entity.parse.failed" || 
          err.message?.includes("Unexpected end") ||
          err.message?.includes("Unexpected token")) {
        req.body = {};
        return next();
      }
      return next(err);
    }
    next();
  });
});

app.get("/health", (_req, res) => res.json({ ok: true }));

// Serve static files (CVs) from public/uploads
app.use("/uploads", express.static("public/uploads"));

app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);
app.use("/api/cv", cvRouter);
app.use("/api/projects", projectRouter);

// ✅ Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler for JSON parsing and other errors
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // Handle JSON parsing errors
    if (err instanceof SyntaxError || (err.type === "entity.parse.failed")) {
      console.error("JSON Parse Error:", err.message);
      // For GET/HEAD/OPTIONS requests, they shouldn't have bodies - return 400
      if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        return res.status(400).json({
          message: "GET requests should not include a request body",
        });
      }
      return res.status(400).json({ 
        message: "Invalid JSON in request body",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
      });
    }

    // Handle other errors
    console.error("Error:", err);
    res.status(err.status || 500).json({
      message: err.message || "Internal server error",
    });
  }
);

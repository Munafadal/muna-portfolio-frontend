import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

import { profileRouter } from "./routes/profile.routes"; // or profileRoutes
import { authRouter } from "./routes/auth.routes";
import { cvRouter } from "./routes/cvRoutes";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);
app.use("/api/cv", cvRouter);

// ✅ Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

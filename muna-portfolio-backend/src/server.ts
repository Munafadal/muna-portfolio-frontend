import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/database";
import profileRoutes from "./routes/profileRoutes";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Profile API
app.use("/api/profiles", profileRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");

    // Sync models (creates or updates tables)
    await sequelize.sync({ alter: true }); // dev: keep schema in sync

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();

import dotenv from "dotenv";
dotenv.config();

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

import { app } from "./app";
import { sequelize } from "./config/database";
// Import models so Sequelize knows about them for table creation
import "./models/Profile";
import "./models/Project";

const PORT = Number(process.env.PORT) || 4000;

// Start server and handle database connection
async function startServer() {
  // Start the server first (don't block on database)
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
    console.log(`✅ Swagger on http://localhost:${PORT}/api/docs`);
  });

  // Try to connect to database (non-blocking)
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
    
    // Sync database models (create tables if they don't exist)
    try {
      await sequelize.sync({ alter: false }); // Use { alter: true } in development to update schema
      console.log("✅ Database tables synced successfully.");
    } catch (syncError: any) {
      console.error("⚠️  Database sync failed:", syncError.message || syncError);
      console.error("⚠️  Tables may not exist. This is OK if running migrations separately.");
    }
  } catch (error: any) {
    console.error("⚠️  Database connection failed:");
    console.error("⚠️  Error:", error.message || error);
    console.error("⚠️  Server is running, but database features may not work.");
    console.error("⚠️  Please check your DATABASE_URL or database environment variables.");
    console.error("⚠️  Current DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");
    // Don't exit - let the server run even without database
  }
}

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});

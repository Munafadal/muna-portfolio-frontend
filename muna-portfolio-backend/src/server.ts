import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { sequelize } from "./config/database";

const PORT = Number(process.env.PORT || 4000);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // for dev; in production use migrations
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
      console.log(`Swagger on http://localhost:${PORT}/api/docs`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

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

sequelize


const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`Swagger on http://localhost:${PORT}/api/docs`);
});

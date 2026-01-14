import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://localhost:${PORT}`);
  console.log(`Swagger on http://localhost:${PORT}/api/docs`);
});


import { Sequelize } from "sequelize";
import pg from "pg";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is not set");
}

const useSsl = dbUrl.includes("sslmode=require") || dbUrl.includes("ssl=true");

export const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions: useSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

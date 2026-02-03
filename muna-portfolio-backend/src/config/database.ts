import { Sequelize } from "sequelize";

// Support DATABASE_URL (common in cloud deployments) or individual DB config
let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  // Use DATABASE_URL if provided (format: postgres://user:pass@host:port/dbname)
  console.log("📦 Using DATABASE_URL for database connection");
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: process.env.DATABASE_URL?.includes("sslmode=require") || 
           process.env.DATABASE_URL?.includes("ssl=true") ? {
        require: true,
        rejectUnauthorized: false,
      } : false,
    },
  });
} else {
  // Fall back to individual environment variables
  console.log("📦 Using individual DB environment variables");
  const dbConfig = {
    database: process.env.DB_NAME || "portfolio",
    username: process.env.DB_USER || "portfolio_user",
    password: process.env.DB_PASS || "portfolio_pass",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres" as const,
    logging: false,
  };
  console.log(`📦 Connecting to: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect,
      logging: false,
    }
  );
}

export { sequelize };

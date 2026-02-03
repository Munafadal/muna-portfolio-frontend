import { Sequelize } from "sequelize";

// Support DATABASE_URL (common in cloud deployments) or individual DB config
let sequelize: Sequelize;

try {
  if (process.env.DATABASE_URL) {
    // Use DATABASE_URL if provided (format: postgres://user:pass@host:port/dbname)
    console.log("📦 Using DATABASE_URL for database connection");
    console.log("📦 DATABASE_URL host:", process.env.DATABASE_URL.match(/@([^:]+)/)?.[1] || "unknown");
    // Ensure the URL uses postgresql:// not postgres:// for better compatibility
    const dbUrl = process.env.DATABASE_URL.replace(/^postgres:\/\//, "postgresql://");
    sequelize = new Sequelize(dbUrl, {
      dialect: "postgres", // Explicitly set PostgreSQL
      dialectModule: require("pg"), // Explicitly use pg module
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
  console.log("📦 Sequelize initialized with PostgreSQL dialect");
} catch (error: any) {
  console.error("❌ Failed to initialize Sequelize:", error.message || error);
  // Create a dummy sequelize instance to prevent crashes
  sequelize = new Sequelize("dummy", "dummy", "dummy", {
    dialect: "postgres",
    logging: false,
    host: "localhost",
    port: 5432,
  });
}

export { sequelize };

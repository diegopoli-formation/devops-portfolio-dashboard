require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const dbConfig = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: "postgres", // Connect to default postgres database first
};

const targetDbName = process.env.DB_NAME || "devops_portfolio";

async function initializeDatabase() {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    console.log("Connected to PostgreSQL server");

    // Drop existing connections to the database before dropping it
    await client.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = '${targetDbName}'
      AND pid <> pg_backend_pid();
    `);

    // Force drop the database if it exists
    console.log(`Dropping existing database: ${targetDbName}`);
    try {
      await client.query(
        `DROP DATABASE IF EXISTS ${targetDbName} WITH (FORCE)`,
      );
      console.log(`Database ${targetDbName} dropped successfully`);
    } catch (error) {
      console.log(`Error dropping database (might not exist):`, error.message);
    }

    // Create a new database with explicit owner
    console.log(`Creating new database: ${targetDbName}`);
    await client.query(`CREATE DATABASE ${targetDbName}`);
    console.log(`Database ${targetDbName} created successfully`);

    await client.end();

    // Now connect to the new database to create tables
    const dbClient = new Client({
      ...dbConfig,
      database: targetDbName,
    });

    await dbClient.connect();
    console.log(`Connected to database: ${targetDbName}`);

    // Read and execute schema SQL file
    const schemaPath = path.join(__dirname, "schema.sql");
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, "utf8");
      await dbClient.query(schemaSql);
      console.log("Schema created successfully");
    }

    // Seed initial data
    const seedPath = path.join(__dirname, "seed.sql");
    if (fs.existsSync(seedPath)) {
      const seedSql = fs.readFileSync(seedPath, "utf8");
      await dbClient.query(seedSql);
      console.log("Seed data inserted successfully");
    }

    await dbClient.end();
    console.log("Database initialization completed successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

initializeDatabase();

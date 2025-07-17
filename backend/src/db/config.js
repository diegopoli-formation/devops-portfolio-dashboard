require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "devops_portfolio",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "devops_portfolio_test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

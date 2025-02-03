const { Pool } = require("pg");
const { Sequelize } = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    logging: true, // Set to true to see SQL queries in logs
});


// Create a connection pool
// const pool = new Pool({
//     host: process.env.POSTGRES_HOST,
//     port: process.env.POSTGRES_PORT,
//     database: process.env.POSTGRES_DB,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     max: 10, // Max number of connections in the pool
//     idleTimeoutMillis: 30000, // Close idle clients after 30s
// });

// pool.on("connect", () => {
//     console.log("Connected to PostgreSQL database");
// });
//
// pool.on("error", (err) => {
//     console.error("Unexpected PostgreSQL error", err);
//     process.exit(-1);
// });

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL Connected Successfully with Sequelize");

        // Sync models with the database
        await sequelize.sync({ alter: true }); // Use { force: true } to reset tables
        console.log("Database synchronized");
    } catch (error) {
        console.error("Sequelize Connection Error:", error);
        process.exit(1);
    }
};


module.exports = { sequelize, connectDB};







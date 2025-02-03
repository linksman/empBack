// Import required modules
const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const apiLimiter = require('./middlewares/rateLimiter'); // Import the middleware
const morgan = require('morgan'); // Logging middleware
//const pool = require("./config/db");
const {connectDB} = require("./config/db");
require("dotenv").config();
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(morgan('combined')); // Add logging middleware
app.use(cors())
app.use('/employees', apiLimiter, employeeRoutes);// Employee routes

connectDB();
// app.get("/", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT NOW()"); // Test query
//         res.json({ message: "PostgreSQL Connected", time: result.rows[0].now });
//     } catch (error) {
//         console.error("Database connection error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

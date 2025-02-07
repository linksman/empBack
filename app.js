// Import required modules
const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const apiLimiter = require('./middlewares/rateLimiter'); // Import the middleware
const morgan = require('morgan'); // Logging middleware
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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});

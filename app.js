// Import required modules
const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const apiLimiter = require('./middlewares/rateLimiter'); // Import the middleware
const morgan = require('morgan'); // Logging middleware

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(morgan('combined')); // Add logging middleware

// Employee routes
app.use('/employees', apiLimiter, employeeRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

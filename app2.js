const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const {connectDB} = require("./config/db");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const employeeRoutes = require('./routes/employeeRoutes');
const apiLimiter = require('./middlewares/rateLimiter'); // Import the middleware
const googleAuthenticator  = require('./middlewares/googleAuthenticator'); // Import the middleware
const morgan = require('morgan'); // Logging middleware
require("dotenv").config();

// Initialize Express app
app.use(morgan('combined')); // Add logging middleware
app.use('/employees', googleAuthenticator(client), apiLimiter, employeeRoutes);// Employee routes


connectDB()


// Verify Google Token
async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload(); // Contains user info
    } catch (error) {
        return null;
    }
}

// API route to verify token and return user data
app.post("/auth/google", async (req, res) => {
    const { token } = req.body;
    const user = await verifyGoogleToken(token);

    if (!user) {
        return res.status(401).json({ error: "Invalid Token" });
    }

    res.json({
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: token
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
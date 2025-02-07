const rateLimit = require('express-rate-limit');

// Define the rate-limiting rules
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        error: 'Too many requests, please try again later.',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = apiLimiter;

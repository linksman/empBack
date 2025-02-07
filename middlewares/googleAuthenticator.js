const  googleAuthenticator = (client) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({error: "Unauthorized"});
        }

        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            req.user = ticket.getPayload(); // Store user data in request
            next();
        } catch (error) {
            return res.status(403).json({error: "Invalid Token"});
        }
    };
};

module.exports = googleAuthenticator;
const jwt = require('jsonwebtoken');

// This function is the "gatekeeper" for our protected routes.
// It checks for a valid JSON Web Token (JWT) in the request headers.
const isAuthenticated = (req, res, next) => {
    // A token is usually sent in the 'Authorization' header like this: "Bearer eyJhbGciOiJI..."
    const authHeader = req.headers.authorization;

    // 1. Check if the header exists and is in the correct format.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication invalid: No token provided or malformed token.' });
    }

    // 2. Extract the token string by removing "Bearer ".
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verify the token using the secret key from your .env file.
        // If the token is invalid or expired, this will throw an error.
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 4. If the token is valid, the 'payload' (e.g., user ID and name) is attached to the request object.
        // Now, any subsequent route handler can access `req.user`.
        req.user = payload;
        
        // 5. Call `next()` to pass control to the next middleware or the actual route handler.
        next();
    } catch (error) {
        // If jwt.verify fails, catch the error and send an unauthorized response.
        return res.status(401).json({ message: 'Authentication invalid: Token is not valid.' });
    }
};

// Export the function so it can be imported in other files (like auth.js and worlds.js)
module.exports = { isAuthenticated };
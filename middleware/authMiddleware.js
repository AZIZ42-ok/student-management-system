const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Get token from request headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send("Access denied. No token provided.");
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).send("Invalid or expired token");
    }
}

module.exports = verifyToken;
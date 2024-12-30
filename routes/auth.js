const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    console.log('Received token:', token);  

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    // Verify token
    jwt.verify(token, "leapxTM", (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Add user info to request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    });
}

module.exports = { authenticateToken };

// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware to authenticate user using JWT token
const Authmiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.token
        if (!token) {
          return res.status(401).send({ error: "No token, authorization denied" });
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT);
        req.body.userId = decoded.userid;
        next();
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Server error" });
      }
};

module.exports = Authmiddleware
const { verifyToken } = require("../utils/jwt");

const isAuthenticated = (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];

    // check if token is valid
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // verify token
    const payload = verifyToken(token);

    // check if payload is valid
    if (!payload) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // attach payload(userId) to request object
    req.user = payload;
    next();
};

module.exports = isAuthenticated;
const jwt = require("jsonwebtoken");

//generate jwt string token using user id
const generateToken = (userId) => {
    return jwt.sign(userId, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

// extract payload from token
const extractPayload = (token) => {
    const payload = verifyToken(token);
    return payload;
};

module.exports = {
    generateToken,
    verifyToken,
    extractPayload
};
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            error: "Token not Provided",
            });
    }

    const [, authToken] = authHeader.split(' ');
 
    try {
        const decoded = await promisify(jwt.verify)(authToken, process.env.AUTH_SECRET);

        req.id = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid Token",
            });
    }
};
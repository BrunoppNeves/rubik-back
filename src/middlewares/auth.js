const jwt = require("jsonwebtoken");
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
        const decoded = jwt.verify(authToken, process.env.SECRET);

        req.id = decoded.id;

        return next();
    } catch (err) {
        console.log(err.message)
        return res.status(401).json({
            error: "Invalid Token",
            });
    }
};
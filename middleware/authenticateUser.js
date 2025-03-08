const jwt = require('jsonwebtoken'); 

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(400).json({message: "Access denied"});
    };

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.userId;
        next();

    }catch(err){
        return res.status(401).json({message: "Invalid or expired user token"});
    };
}

module.exports = authenticateUser;
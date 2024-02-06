const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next)=>{
    const token = req.cookies.token;

    if (!token) {
        res.status(404).send({ message: "Please login" });
    }
    try {
        decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send({message : "Please auth"})
    }
    next();

}


module.exports = auth;
const jwt = require('jsonwebtoken');
const JWT_KEY = require('./secrets')

function protectRouter(req, res, next){
    if(req.cookies.isLogIn){
        let isVerified = jwt.verify(req.cookies.isLogIn, JWT_KEY);
        if(isVerified)
            next();
        else
            res.json({message:"User Error "})    
    }else{
        res.json({
            message: "User Not Allowed"
        })
    }
}

module.exports = protectRouter;
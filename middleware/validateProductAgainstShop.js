const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateProductAgainstShop = asyncHandler(async(req,res,next)=>{

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization

    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
    }
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err, decoded) =>{
        if(err) {
        res.status(400).json({message: err.message});
        }
        req.shop_id.user =   decoded.user;
        console.log(decoded.user);
        next();
    });

    if(!token) {
        res.status(403).json({message: 'Token is required'});
    }
});

module.exports = validateProductAgainstShop;
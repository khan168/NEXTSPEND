const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const Auth = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error);
            res.status(401).json({error:error})
        }
    }
    if(!token){
        res.status(401).json({ error: "Not authorised" });
    }

};

module.exports = {Auth}
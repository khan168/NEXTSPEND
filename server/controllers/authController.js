const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const {validationResult } = require("express-validator");


// @ desc       login user
// @ router     router /api/user/login
const login= async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const { email, password } = req.body;
        const user = await User.findOne({email:email}) 
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                token:generateToken(user.id)
            })
        }
        else{
            res.status(400)
            res.json({error:"Invalid credentials"})
        }
    }catch(err){
            res.status(400)
            res.json({ error: err });
    }
}

// @ desc       sign up user
// @ router     router /api/user/signup
const  register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const {name,email,password} = req.body;
        const existinguser = await User.findOne({ email: email });
        if(existinguser){
            return res.status(400).json({error:"Invalid credentials"})
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        if(user){
            res.status(201).json({
                token:generateToken(user.id)
            })
        }else{
            return res.status(500).json({ error: "Invalid data" })  //case of server error
        }
    }catch(err){
        console.log(err);
        res.status(400);
        res.json({ error: err });
    }
}



//generate jwt
const generateToken = (id)=>{
    return jwt.sign(
        { id }, process.env.JWT_SECRET,{expiresIn:"30d"}
        );
}

module.exports={
    login,register
}
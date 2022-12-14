const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler')   //instead of using try-catch or .then.catch
require("dotenv").config();

// @ desc       login user
// @ router     router /api/user/login
const login= asyncHandler(async (req,res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({email:email}) 

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id)
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid credentials");
    }
    
});

// @ desc       sign up user
// @ router     router /api/user/signup
const  register = asyncHandler(async (req, res) => {

    const {name,email,password} = req.body;
    if(!email || !name || !password){
        res.status(400)
        throw new Error("please add all fields")
    }
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id)
        }
        )
    }else{
        res.status(400)
        throw new Error("Invalid data")
        }
    
});

// @ desc       get user data
// @ router     router /api/user/getuser
// @ protected
const getuser =asyncHandler(async (req,res)=>{
    const {_id,name,email} = await User.findById(req.user.id)
    res.status(200).json({
        id:_id,
        name,
        email
    })
});



//generate jwt
const generateToken = (id)=>{
    return jwt.sign(
        { id }, process.env.JWT_SECRET,{expiresIn:"30d"}
        );
}

module.exports={
    login,register,getuser
}
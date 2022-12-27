const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
    },
  },
);



const User = mongoose.model("User", userSchema);    
module.exports = User;

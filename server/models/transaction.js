const mongoose = require("mongoose")
const user = require("../models/user")

const trasactionSchema = new mongoose.Schema({
    amount:{
        type:Number ,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
},  {
    timestamps:true
});




const Transaction = new mongoose.model("Transaction",trasactionSchema);
module.exports=Transaction
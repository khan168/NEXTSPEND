const express = require('express')
const app = express();

const ErrorHandler=(err,req,res,next)=>{
    res.status(err.code || 500)
    if(app.get("env")!=="production"){
        if(app.get("env")==="development"){
            console.log(err);
        }
        res.send(err.message)
    }else{
        res.send("500 internal server error")
    }
} 





module.exports ={ErrorHandler}
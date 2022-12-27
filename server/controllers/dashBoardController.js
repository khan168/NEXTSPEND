const Transaction = require("../models/transaction");
const User = require("../models/user")


// @ desc       get user data
// @ router     router /api/user/userinfo
// @ protected
const getUser =async (req,res,next)=>{
    try{
        const {_id,name,email} = await User.findById(req.user.id)
        res.status(200).json({
            id:_id,
            name,
            email
        })
    }catch(err){
        next(err);
    }
}


// @ desc        Get all transactions of user
// @ router     router /api/transactions
// @ protected
const getUserTransactions =async (req,res,next)=>{
    try{
        const usertransaction = await Transaction.find({userid:req.user.id})
        res.status(201).json({ transaction: usertransaction });
    }catch(err){
        next(err);
    }
}

// @ desc       Create a transaction
// @ router     router /api/transactions
// @ protected
const createTransaction =async (req,res,next)=>{
    try{
        const transaction = new Transaction({amount:req.body.amount,userid:req.user.id},);
        await transaction.save();
        res.status(201).json({ transaction: transaction });
    }catch(err){
        next(err);
    }
}

// @ desc        update user's particular transaction 
// @ router      router /api/transactions
// @ protected
const updateTransaction =async (req,res,next)=>{
    try{
        await Transaction.findOneAndUpdate({'_id':req.body.id},{amount:req.body.amount})
        res.status(200).json({message:`updated ${req.body.id} successfully`})
    }catch(err){
        next(err);
    }
}

// @ desc       delete user's particular transaction
// @ router     router /api/transactions
// @ protected
const deleteTransaction =async (req,res,next)=>{
    try{
        await Transaction.findOneAndDelete({ _id: req.body.id });
        res.status(200).json({message:`Deleted ${req.body.id} successfully`})
    }catch(err){
        next(err);
    }
}


module.exports={getUserTransactions,getUser,createTransaction,updateTransaction,deleteTransaction}
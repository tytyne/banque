const express=require('express');
const mongoose=require('mongoose');
const Joi=require('joi');


const transactionSchema= new mongoose.Schema({

    accountName:{
        type:String
    },
    accountNumber:{
        type:Number
    },
    transactionName:{
        type:String,
        enum:['withdraw','deposit'],
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    transactionDate:{
        type:Date,
        required:true

    }
});

const Transaction=mongoose.model('Transaction',transactionSchema);

function validateTransaction(p){

    const schema={
        accountName:Joi.string().required(),
        accountNumber:Joi.string().required(),
        transactionName:Joi.string().valid('withdraw','deposit').required(),
        amount:Joi.number().required(),
        transactionDate:Joi.date().required(),
       
    }

    return Joi.validate(p,schema)
}

exports.Transaction=Transaction
exports.validate=validateTransaction;
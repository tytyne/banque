const{User}=require('../models/user');
const Joi=require('joi');
const randomize=require('randomatic');
const mongoose=require('mongoose');
const express=require('express');

const accountSchema = new mongoose.Schema({

accountName:{
type:String,

},  
NID:{
    type:Number,
    required:true
},

status:{
    type:String,
    enum:['active','dormant','draft'],
    default:'draft',
    required:true
},
amount:{
    type:Number,
    default:0,
    required:true
},
creationDay:{
    type:Date,
    default:Date.now,
    required:true
},
accountNumber:{
    type:String
}

});

accountSchema.methods.generateAccount=function(){
   const randomaze= randomize('0',10);
   this.accountNumber = randomaze;

   return this.accountNumber;
}
const Account=mongoose.model('Account',accountSchema);
function validateAccount(account)
{
    const schema={
        NID:Joi.number().required(),
        amount:Joi.number(),
        creationDay:Joi.date(),
        accountName:Joi.string(),
        status:Joi.string()
    

    }

    return Joi.validate(account,schema)
}

exports.Account=Account;
exports.validate=validateAccount;



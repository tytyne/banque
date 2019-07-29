const Joi=require('joi');
const mongoose=require('mongoose');
const config=require('config');
const jwt=require('jsonwebtoken');
const userSchema= new mongoose.Schema({

    name:{
        type:String,
        minlength:3,
        maxlength:50,
        required:true
    },

    email:{
        
        type:String,
        required:true
    },
    password:{
        type:String,
        minlength:3,
        maxlength:500,
        required:true

    },
    isAdmin:Boolean
});
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivatekey'));
    return token;
    }
const User=mongoose.model('User',userSchema);

function validateUser(person){
const schema ={
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().required().email(),
    password:Joi.string().min(3).max(500).required()
};
return Joi.validate(person,schema)
}
exports.User=User;
exports.validate=validateUser;




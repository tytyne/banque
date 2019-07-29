
const{User,validate}=require('../models/user')
const auth=require('../middleware/auth');
const bcrypt=require('bcryptjs');
const _=require('lodash');
const express=require('express');
const router=express.Router();

router.post('/', async(req ,res)=>{
const {error} = validate (req.body);
if (error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email});
    if(user) return res.send('email is already used');
    user = new User (_.pick(req.body,['name','email','password']));
    const salt= await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(user.password,salt);
    await user.save() ;
    
    res.send(user);
});

module.exports=router;

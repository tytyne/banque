const jwt=require('jsonwebtoken');
config=require('config');
const express=require('express');

function auth(req,res,next){
const token=req.header('x-auth-access');
if(!token) return res.status(500).send('access denied')

try{
const decoded=jwt.verify(token,config.get('jwtPrivatekey'));
req.user=decoded;
next();
}
catch(ex){
res.send('invalid token');
}

}

module.exports=auth;

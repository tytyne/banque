const express=require('express');
const{Transaction,validate}=require('../models/transaction');
const{Account}=require('../models/account');
const auth=require('../middleware/auth')
const Joi =require('joi');
const router=express.Router()


router.post('/:_id',auth, async(req,res)=>{
    const{error}=validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const account=await Account.findById({_id:req.params._id});
    if(!account) return res.status(400).send('Invalid account');
    transaction =new Transaction({
        accountName:req.body.accountName,
        accountNumber:req.body.accountNumber,
        transactionName:req.body.transactionName,
        amount:req.body.amount,
        transactionDate:req.body.transactionDate
    });
    await transaction.save()
    res.send(transaction)

});

router.put('/:_id/debit/:id', async (req, res) => {
    

    const account=await Account.findById({_id:req.params._id});
    if(!account) return res.status(400).send('Invalid account');

    const transaction=await Transaction.findByIdAndUpdate({_id:req.params.id});
    if(!transaction) return res.status(400).send('Invalid transaction');
    if(transaction.transactionName == 'withdraw'&& transaction.amount-account.amount<=0) return res.status(400).send('insufficient amount');
    account.amount=parseInt(account.amount)-parseInt(transaction.amount);
    await account.save()
    res.json({
        message: 'Account debited ',
        amount: account.amount
    })
});

router.put('/:_id/credit/:id', async (req, res) => {
    
    const account=await Account.findById({_id:req.params._id});
    if(!account) return res.status(400).send('Invalid account');

    const transaction=await Transaction.findByIdAndUpdate({_id:req.params.id});
    if(!transaction) return res.status(400).send('Invalid transaction');
    if(transaction.transactionName == 'deposit');
    account.amount=parseInt(account.amount) + parseInt(transaction.amount);
    account.status='active';
    await account.save();
    res.json({
        message: 'Account credited ',
        amount: account.amount
    });
router.delete('/deactive/:_id',async(req,res)=>{
    const account=await Account.findByIdAndRemove({_id:req.params._id});
    if(!account) return res.status(400).send('Invalid account');
    res.send(account);
    
});

router.get('/one/:_id',async(req,res) => {

   try{
    const one = await Transaction.findById(req.params._id);
    if(!one) return  res.status(400).send('you are not allowed to this transaction');

    res.send(one); 

   } 
   catch(ex)
   {
       res.status(400).send('id is incorrect');
   }
});
   
 router.get('/:_id', async(req,res) =>{
     try{
        const guess=await Account.findById(req.params._id);
        if(!guess) return res.status(400).send('you are not allowed to see all transactions');
        const all = await Transaction.find();
        res.send(all);
     }
     catch(ex){
         res.status(400).send('id is incorrect');
     }
     
 }); 
 
//  router.update('/:_id',async(req,res)=>{


 });


module.exports=router;

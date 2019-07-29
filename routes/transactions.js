const express=require('express');
const{Transaction,validate}=require('../models/transaction');
const{Account}=require('../models/account');
const Joi =require('joi');
const router=express.Router()


router.post('/:_id', async(req,res)=>{
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

router.put('/debit/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const accountp=await Transaction.findByIdAndUpdate({_id:req.params._id});
    if(!accountp) return res.status(400).send('Invalid account');
    const transaction=await Transaction.findByIdAndUpdate({_id:req.params._id});
    if(!transaction) return res.status(400).send('Invalid transaction');
    if(Transaction.transactionName == 'withdraw'&& Account.amount<=0) return res.status(400).send('insufficient amount');
    Account.amount=parseInt(Account.amount)-parseInt(Transaction.amount);
    await account.save()
    res.json({
        message: 'Account debited ',
        amount: account.amount
    })
});

router.put('/credit/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const accountp=await Transaction.findByIdAndUpdate({_id:req.params._id});
    if(!accountp) return res.status(400).send('Invalid account');
    const transaction=await Transaction.findByIdAndUpdate({_id:req.params._id});
    if(!transaction) return res.status(400).send('Invalid transaction');
    if(Transaction.transactionName == 'deposit');
    Account.amount=parseInt(Account.amount)+parseInt(Transaction.amount);
    await account.save();
    res.json({
        message: 'Account credited ',
        amount: account.amount
    });
router.put('/deactivate/:id',async(req,res)=>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const account=await Transaction.findByIdAndUpdate({_id:req.params._id});


});
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


//  });


module.exports=router;

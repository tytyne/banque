
const express=require('express');
const app = express();
const mongoose=require('mongoose');
const users=require('./routes/users');
const auth=require('./routes/auth');
const accounts=require('./routes/accounts')
const transactions=require('./routes/transactions')
const config = require('config');
const jwt=require('jsonwebtoken');

if(!config.get("jwtPrivatekey")){
  console.log('Please put jwtPrivateKey');
  process.exit(1);
}
mongoose.connect('mongodb://localhost:27017/banka', {useNewUrlParser: true})
  .then(()=>console.log('connect to database'))
   .catch(err =>console.error('could not connect to mongodb'))
app.use(express.json());
app.use('/api/auth',auth);
app.use('/api/transactions',transactions)
app.use('/api/users', users);
app.use('/api/accounts',accounts);
const port= process.env.PORT||5000;
app.listen(port,() =>console.log(`listening to ....${port}`));

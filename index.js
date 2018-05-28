const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var morgan = require('morgan');
morgan('tiny');

//setup express app
const app = express();

//connect to mongo db
mongoose.connect('mongodb://localhost/ecart');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/images', express.static('images'));



//initialise routes

app.use('/api',require('./routes/user_api'));
app.use('/api',require('./routes/product_api'));
app.use('/image', require('./routes/image_api'));
app.use('/api', require('./routes/address_api'));
app.use('/api', require('./routes/cart_api'));
app.use('/api', require('./routes/wishlist_api'));
app.use('/api', require('./routes/ratings_api'));


//error handling
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message});
});




//listen to requests
app.listen(process.env.port || 4000, function(){
  console.log('listening...');
});

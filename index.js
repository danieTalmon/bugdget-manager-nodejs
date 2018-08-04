var env = process.env.NODE_ENV || "development";
console.log('env======',env);

if (env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/BudgetApp';
}else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/BudgetAppTest';
}

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./config/db/mongoose');
var {Budget} = require('./config/models/Budget');
var {saveInTheDB,getFromTheDB} = require('./server/server.js');
var {Categories} = require('./config/models/Categories');
var {Current} = require('./config/models/Current');
var {SubCategories} = require('./config/models/SubCategories');
var {User} = require('./config/models/Users');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	next();
});

// ===== Budget ======
// create budget
app.post('/budgets', (req, res) => {

  var budget = mongoose.model('Budget');
  saveInTheDB(budget,req.body,res);

});

//read all budget
app.get('/budgets', (req, res) => {
  model = mongoose.model('Budget');

  getFromTheDB(model,res);
  });

//update budget
app.put('/budgets', (req, res) => {
  var budget = req.body.data;
  var query = req.body.query;
  var model = mongoose.model('Budget');

  //clean the object from null or undefined keys
  budget = _.pickBy(budget,_.identity);

  updateInTheDB(model,query,budget,res)

  // model.findOneAndUpdate(query,budget,options).then((doc) => {
  //   res.send(doc);
  // }, (e) => {
  //   res.status(400).send(e);
  // });
});

//delete budget
app.delete('/budgets', (req, res) => {
  var id = req.body;
  var model = mongoose.model('Budget');

  deleteFromTheDB(model,id,res);

});

// ===== Categories ======

// create Category
app.post('/categories', (req, res) => {

  var model = mongoose.model('Categories');
  saveInTheDB(model,req.body,res);

});

//read all Category
app.get('/categories', (req, res) => {
  model = mongoose.model('Categories');

getFromTheDB(model,res);

  });

//update Category
app.put('/categories', (req, res) => {
  var budget = req.body.data;
  var query = req.body.query;
  var model = mongoose.model('Categories');

  //clean the object from null or undefined keys
  budget = _.pickBy(budget,_.identity);

  updateInTheDB(model,query,budget,res);
});

//delete Category
app.delete('/categories', (req, res) => {
  var id = req.body;
  var model = mongoose.model('Categories');

  deleteFromTheDB(model,id,res);

});
// ===== subCategories ======

// create subCategories
app.post('/subCategories', (req, res) => {

  var model = mongoose.model('SubCategories');
  saveInTheDB(model,req.body,res);

});

//read all subCategories
app.get('/subCategories', (req, res) => {
  model = mongoose.model('SubCategories');

getFromTheDB(model,res);

  });

//update subCategories
app.put('/subCategories', (req, res) => {
  var budget = req.body.data;
  var query = req.body.query;
  var model = mongoose.model('SubCategories');

  //clean the object from null or undefined keys
  budget = _.pickBy(budget,_.identity);

  updateInTheDB(model,query,budget,res);
});

//delete subCategories
app.delete('/subCategories', (req, res) => {
  var id = req.body;
  var model = mongoose.model('SubCategories');

  deleteFromTheDB(model,id,res);

});

// ===== current ======

// create current
app.post('/current', (req, res) => {

  var model = mongoose.model('Current');
  saveInTheDB(model,req.body,res);

});

//read all current
app.get('/current', (req, res) => {
  model = mongoose.model('Current');

getFromTheDB(model,res);

  });

//update current
app.put('/current', (req, res) => {
  var budget = req.body.data;
  var query = req.body.query;
  var model = mongoose.model('Current');

  //clean the object from null or undefined keys
  budget = _.pickBy(budget,_.identity);

  updateInTheDB(model,query,budget,res);
});

//delete current
app.delete('/current', (req, res) => {
  var id = req.body;
  var model = mongoose.model('Current');

  deleteFromTheDB(model,id,res);

});

//====== Users ========

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.post('/users/login',(req,res) =>{
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCradentials(body.email,body.password).then((user)=>{
    res.send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });

});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};

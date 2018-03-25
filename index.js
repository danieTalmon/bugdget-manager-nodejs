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
var {Categories} = require('./config/models/Categories');
var {Current} = require('./config/models/Current');
var {SubCategories} = require('./config/models/SubCategories');
var {User} = require('./config/models/Users');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


// create budget
app.post('/budgets', (req, res) => {

  var budget = new Budget(req.body);

  budget = _.pickBy(budget,_.identity);


  budget.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//read all budget
app.get('/budgets', (req, res) => {

  Budget.find().then((budgets) => {
  res.send({budgets});
  }, (e) => {
    res.status(400).send(e);
  });
  });

//update budget

app.post('/Categories', (req, res) => {
  var categories = new Categories({
    text: req.body.text
  });

  categories.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
app.post('/subCategories', (req, res) => {
  var subCat = new SubCategories({
    text: req.body.text
  });

  subCat.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
app.post('/current', (req, res) => {
  var current = new Current({
    text: req.body.text
  });

  current.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


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

const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Budget} = require('./../../config/models/Budget');
const {Categories} = require('./../../config/models/Categories');
const {SubCategories} = require('./../../config/models/SubCategories');
const {Current} = require('./../../config/models/Current');
const {User} = require('./../../config/models/Users');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'andrew@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass'
}];

const budgets = [{
  _id: new ObjectID(),
  subCatId: "10",
  catId: "5",
  budget:300
}, {
  _id: new ObjectID(),
    subCatId: "4",
  catId: "5",
  budget:400
}];

const categories = [{
  _id: new ObjectID(),
  name: "Food",
  catId: "6",
  _creator:"root"
}, {
  _id: new ObjectID(),
    name: "Incoming",
  catId: "5",
  _creator:"root"
}];
const subCategories = [{
  _id: new ObjectID(),
  name: "Food for Home",
  catId: "6",
  subCatId:"1",
  _creator:"root"
}, {
  _id: new ObjectID(),
    name: "Junk",
  catId: "6",
  subCatId:"2",
  _creator:"root"
}];
const current = [{
  _id: new ObjectID(),
  catId:"6",
  subCatId: "1",
  description:"shabat",
  amount:100,
  createdAt:new Date().valueOf()
}, {
  _id: new ObjectID(),
  catId:"6",
  subCatId: "1",
  description:"coffe",
  amount:10,
  createdAt:new Date().valueOf()
}];



const populateBudgets = (done) => {
  Budget.remove({}).then(() => {
    return Budget.insertMany(budgets);
  }).then(() => done());
};

const populateCategories = (done) => {
  Categories.remove({}).then(() => {
    return Categories.insertMany(categories);
  }).then(() => done()).catch((e)=>done(e));
};

const populateSubCategories = (done) => {
  SubCategories.remove({}).then(() => {
    return SubCategories.insertMany(subCategories);
  }).then(() => done()).catch((e)=>done(e));
};

const populateCurrent = (done) => {
  Current.remove({}).then(() => {
    return Current.insertMany(current);
  }).then(() => done()).catch((e)=>done(e));
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {budgets, populateBudgets,categories,subCategories,current, users,
   populateUsers,populateCategories,populateSubCategories,populateCurrent};

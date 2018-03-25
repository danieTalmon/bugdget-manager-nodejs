const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Budget} = require('./../../config/models/Budget');
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

console.log(`${budgets[0]._id}  and   ${budgets[1]._id}`)

const populateBudgets = (done) => {
  Budget.remove({}).then(() => {
    return Budget.insertMany(budgets);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {budgets, populateBudgets, users, populateUsers};

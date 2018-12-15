const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../index');
const {Budget} = require('./../config/models/Budget');
const {Categories} = require('./../config/models/Categories');
const {SubCategories} = require('./../config/models/SubCategories');
const {Current} = require('./../config/models/Current');
const {User} = require('./../config/models/Users');
const {budgets,categories,subCategories,current,
   populateBudgets, users, populateUsers,populateCategories,populateSubCategories}
   = require('./seed/seed');
  const {populateCurrent} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateBudgets);
beforeEach(populateCategories);

describe('POST /budgets', () => {
  it('should create a new budget', (done) => {
    var doc = {  subCategory:{id: "15", name : "Yerusha"},
      category:{id :"3", name: "Incoming"},
        budget:300};


    request(app)
      .post('/budgets')
      .send(doc)
      .expect(200)
      .expect((res) => {
        expect(res.body.category.id).toBe(doc.category.id);
        expect(res.body.budget).toBe(doc.budget);
        done();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      })
      });

  it('should not create budget with invalid body data', (done) => {
    request(app)
      .post('/budgets')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      })

        Budget.find().then((budgets) => {
          expect(budgets.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
      it('should update some budget', (done) => {
        var _id = budgets[1]._id;
        request(app)
          .put('/budgets')
          .send({query:{_id},data:{budget:900}})
          .expect(200)
          .expect((res) => {
            expect(res.body._id).toBe(_id);
          })

            Budget.find().then((budgets) => {
              expect(budgets.length).toBe(2);
              done()
            }).catch((e) => done(e))
          });
  });


describe('GET /budgets', () => {
  it('should get all budgets', (done) => {
    request(app)
      .get('/budgets')
      .expect(200)
      .expect((res) => {
        expect(res.body.docs.length).toBe(2);
      })
      .end(done)
  });
});


describe('POST /Categories', () => {
  it('should create a new category', (done) => {
    var doc = {
      _id: new ObjectID(),
        name: "Jewdism",
      catId: "8",
      _creator:"root"
    };


    request(app)
      .post('/categories')
      .send(doc)
      .expect(200)
      .expect((res) => {
        expect(res.body.CatId).toBe(doc.CatId);
        expect(res.body.name).toBe(doc.name);
        done();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      })
      });

  it('should not create category with invalid body data', (done) => {
    request(app)
      .post('/categories')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      })

        Categories.find().then((docs) => {
          expect(docs.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
      it('should update some category', (done) => {
        var _id = categories[1]._id;
        request(app)
          .put('/categories')
          .send({query:{_id},data:{name:'House'}})
          .expect(200)
          .expect((res) => {
            expect(res.body._id).toBe(_id);
          })

            Categories.find().then((docs) => {
              expect(docs.length).toBe(2);
              done()
            }).catch((e) => done(e))
          });
  });


describe('GET /Categories', () => {
  it('should get all categories', (done) => {
    request(app)
      .get('/categories')
      .expect(200)
      .expect((res) => {
        expect(res.body.docs.length).toBe(2);
      })
      .end(done)
  });
});

beforeEach(populateSubCategories);

describe('POST /subCategories', () => {
  it('should create a new category', (done) => {
    var doc = {
      _id: new ObjectID(),
      name:"mekva",
      catId: "3",
      subCatId: "8",
      type:0,
      _creator:"root"
    };


    request(app)
      .post('/subCategories')
      .send(doc)
      .expect(200)
      .expect((res) => {
        expect(res.body.CatId).toBe(doc.CatId);
        expect(res.body.name).toBe(doc.name);
        done();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      })
      });

  it('should not create category with invalid body data', (done) => {
    request(app)
      .post('/subCategories')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      })

        SubCategories.find().then((docs) => {
          expect(docs.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
      it('should update some category', (done) => {
        var _id = categories[1]._id;
        request(app)
          .put('/subCategories')
          .send({query:{_id},data:{name:'Food for Home'}})
          .expect(200)
          .expect((res) => {
            expect(res.body._id).toBe(_id);
          })

            SubCategories.find().then((docs) => {
              expect(docs.length).toBe(2);
              done()
            }).catch((e) => done(e))
          });
  });


describe('GET /subCategories', () => {
  it('should get all categories', (done) => {
    request(app)
      .get('/subCategories')
      .expect(200)
      .expect((res) => {
        expect(res.body.docs.length).toBe(2);
      })
      .end(done)
  });
});

beforeEach(populateCurrent);

describe('POST /current', () => {
  it('should create a new current', (done) => {
    var doc = {
	_id : new ObjectID(),
  subCategory: {id: "9", name : "test"},
  category: {id :"1", name: "subTest"},
  description:"a112",
  amount:12
    };

	request(app)
      .post('/current')
      .send(doc)
      .expect(200)
      .expect((res) => {
        expect(res.body.category.id).toBe(doc.category.id);
        expect(res.body.amount).toBe(doc.amount);
        done();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      })
      });
});

// describe('GET /todos/:id', () => {
//   it('should return todo doc', (done) => {
//     request(app)
//       .get(`/todos/${todos[0]._id.toHexString()}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(todos[0].text);
//       })
//       .end(done);
//   });
//
//   it('should return 404 if todo not found', (done) => {
//     var hexId = new ObjectID().toHexString();
//
//     request(app)
//       .get(`/todos/${hexId}`)
//       .expect(404)
//       .end(done);
//   });
//
//   it('should return 404 for non-object ids', (done) => {
//     request(app)
//       .get('/todos/123abc')
//       .expect(404)
//       .end(done);
//   });
// });
//
// describe('DELETE /todos/:id', () => {
//   it('should remove a todo', (done) => {
//     var hexId = todos[1]._id.toHexString();
//
//     request(app)
//       .delete(`/todos/${hexId}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(hexId);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//
//         Todo.findById(hexId).then((todo) => {
//           expect(todo).toNotExist();
//           done();
//         }).catch((e) => done(e));
//       });
//   });
//
//   it('should return 404 if todo not found', (done) => {
//     var hexId = new ObjectID().toHexString();
//
//     request(app)
//       .delete(`/todos/${hexId}`)
//       .expect(404)
//       .end(done);
//   });
//
//   it('should return 404 if object id is invalid', (done) => {
//     request(app)
//       .delete('/todos/123abc')
//       .expect(404)
//       .end(done);
//   });
// });
//
// describe('PATCH /todos/:id', () => {
//   it('should update the todo', (done) => {
//     var hexId = todos[0]._id.toHexString();
//     var text = 'This should be the new text';
//
//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send({
//         completed: true,
//         text
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(text);
//         expect(res.body.todo.completed).toBe(true);
//         expect(res.body.todo.completedAt).toBeA('number');
//       })
//       .end(done);
//   });
//
//   it('should clear completedAt when todo is not completed', (done) => {
//     var hexId = todos[1]._id.toHexString();
//     var text = 'This should be the new text!!';
//
//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send({
//         completed: false,
//         text
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(text);
//         expect(res.body.todo.completed).toBe(false);
//         expect(res.body.todo.completedAt).toNotExist();
//       })
//       .end(done);
//   });
// });
//
// describe('GET /users/me', () => {
//   it('should return user if authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .set('x-auth', users[0].tokens[0].token)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body._id).toBe(users[0]._id.toHexString());
//         expect(res.body.email).toBe(users[0].email);
//       })
//       .end(done);
//   });
//
//   it('should return 401 if not authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .expect(401)
//       .expect((res) => {
//         expect(res.body).toEqual({});
//       })
//       .end(done);
//   });
// });
//
// describe('POST /users', () => {
//   it('should create a user', (done) => {
//     var email = 'example@example.com';
//     var password = '123mnb!';
//
//     request(app)
//       .post('/users')
//       .send({email, password})
//       .expect(200)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toExist();
//         expect(res.body._id).toExist();
//         expect(res.body.email).toBe(email);
//       })
//       .end((err) => {
//         if (err) {
//           return done(err);
//         }
//
//         User.findOne({email}).then((user) => {
//           expect(user).toExist();
//           expect(user.password).toNotBe(password);
//           done();
//         });
//       });
//   });
//
//   it('should return validation errors if request invalid', (done) => {
//     request(app)
//       .post('/users')
//       .send({
//         email: 'and',
//         password: '123'
//       })
//       .expect(400)
//       .end(done);
//   });
//
//   it('should not create user if email in use', (done) => {
//     request(app)
//       .post('/users')
//       .send({
//         email: users[0].email,
//         password: 'Password123!'
//       })
//       .expect(400)
//       .end(done);
//   });
// });

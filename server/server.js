var mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
var {Categories} = require('../config/models/Categories');
var {SubCategories} = require('../config/models/SubCategories');
const moment = require('moment')
const modelWithDate = ['Budget','Current'];

var saveInTheDB = (model,data,res) => {

  model.create(data).then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

};

var changeTheTime =  (docs,format) => {
  for (var i=0;i<docs.length;i++) {
    try{
    var date = moment(docs[i]['createdAt']);
    docs[i].createdAt = date.format(format);
  }
   catch(error){
     console.log(error);
     break;
   }
  }
};

var changeThecategory =function (docs) {
  let cats
  var docsOfCat = Categories.find({},
  function(cats){
    for (var i=0;i<docs.length;i++) {
      var category = _.find(docsOfCat,(cat) =>cat.catId == docs[i]['catId'] );
      docs[i].catId = category.name;
    }
    console.log(docs);
  });
};

var getFromTheDB = (model,res) => {

  model.find().then((docs) => {
    modelName = model['modelName'];
  if(modelWithDate.indexOf(modelName)!=-1){
    changeTheTime(docs,"MMMM Do YYYY");
    changeThecategory(docs);

  }
  res.send({docs});
  }, (e) => {
    res.status(400).send(e);
  });

};

var updateInTheDB = (model,query,updateData,res) => {
  var options = {runValidators:true};

  model.findOneAndUpdate(query,updateData,options).then((doc) => {
     res.send(doc);
   }, (e) => {
     res.status(400).send(e);
   });

}

var deleteFromTheDB = (model,id,res) => {

  model.findByIdAndRemove(id).then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
};

module.exports = {saveInTheDB,getFromTheDB,updateInTheDB,deleteFromTheDB};

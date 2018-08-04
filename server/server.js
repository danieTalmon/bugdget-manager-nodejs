var mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
var {Categories} = require('./config/models/Categories');
var {SubCategories} = require('./config/models/SubCategories');
const moment = require('moment')
const modelWithDate = ['Budget','Current'];

var saveInTheDB = (model,data,res) => {

  model.create(data).then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

};

var changeTheTime = (docs,format) => {
  for doc in docs {
    date = doc['createdAt'];
    try{
    doc['createdAt'] = date.format(format);
   catch(error){
     console.log(error);
     break;
   }
  }
};

var changeThecategory = (docs) => {
  Categories.find().then((cats)=>{
    for doc in docs {
      category = _.find(cats,(cat) =>cat.catId == doc.catId );
      doc['catId'] = category.name;
    }
  });
}

var getFromTheDB = (model,res) => {

  model.find().then((docs) => {
    modelName = doc.modelName();
  if(modelName == 'Current' or modelName == 'Budget'){
    changeTheTime(docs,"MMMM Do YYYY");
    changeThecategory(docs,)
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

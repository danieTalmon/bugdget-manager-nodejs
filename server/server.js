var mongoose = require('mongoose');
const express = require('express');

var saveInTheDB = (model,res) => {

  model.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

};

var getFromTheDB = (model,res) => {

  model.find().then((budgets) => {
  res.send({budgets});
  }, (e) => {
    res.status(400).send(e);
  });

};

module.exports = {saveInTheDB,getFromTheDB};

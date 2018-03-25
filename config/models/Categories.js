var mongoose = require('mongoose');

var Categories = mongoose.model('Categories', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  CatId:{
    type: String,
    unique:true,
    default: "0"
  },
  type: {
    type: Number,
    enum:[0,1],
    default: 0
  },
  _creator:{
    type: String
  }
});

module.exports = {Categories};

var mongoose = require('mongoose');

var SubCategories = mongoose.model('SubCategories', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  catId:{
    type: String,
    required: true,
    default: 0
  },
  subCatId:{
    type: String,
    unique:true,
    required: true,
    default: null
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

module.exports = {SubCategories};

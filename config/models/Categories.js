var mongoose = require('mongoose');

var Categories = mongoose.model('Categories', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  catId:{
    type: String,
    unique:true,
    default: "0"
  },
  _creator:{
    type: String,
    default:"root"
  }
});

module.exports = {Categories};

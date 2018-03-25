var mongoose = require('mongoose');

var Current = mongoose.model('Current', {
  catId: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  subCatID: {
    type: String,
    minlength: 1,
    trim: true
  },
  amount:{
    type: Number,
    required : true,
    default: 0
  },
  createdAt:{
    type: Number,
    required:true
}
});

module.exports = {Current};

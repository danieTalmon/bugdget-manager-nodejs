var mongoose = require('mongoose');

var Current = mongoose.model('Current', {
  catId: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  subCatId: {
    type: String,
    minlength: 1,
    trim: true
  },
  description:{
    type:String,
    default:""
  },
  amount:{
    type: Number,
    required : true,
    default: 0
  },
  createdAt:{
    type: Number,
	default : Date.now(),
    required:true
}
});

module.exports = {Current};

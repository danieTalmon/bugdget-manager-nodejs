var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Current = mongoose.model('Current', {
  subCategory : {
    id: {
        type: String,
        minlength: 1,
        trim: true
    },
    name : {
      type: String,
      minlength: 1
    }
  },
  category: {
    id: {
        type: String,
        minlength: 1,
        trim: true
    },
    name : {
      type: String,
      minlength: 1
    }
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
    type: Schema.Types.Mixed,
	default : Date.now(),
    required:true
}
});

module.exports = {Current};

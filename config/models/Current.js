var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Current = mongoose.model('Current', {
  catId: {
    type: Schema.Types.Mixed,
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
    type: Schema.Types.Mixed,
	default : Date.now(),
    required:true
}
});

module.exports = {Current};

var mongoose = require('mongoose');

var Budget = mongoose.model('Budget', {
  subCategory : {
    id: {
        type: String,
        required : true,
        minlength: 1,
        trim: true
    },
    name : {
      type: String,
      required : true,
      minlength: 1
    }
  },
  category: {
    id: {
        type: String,
        required : true,
        minlength: 1,
        trim: true
    },
    name : {
      type: String,
      required : true,
      minlength: 1
    }
  },
  budget:{
    type: Number,
    required : true,
    default: 0
  },
  estimateTime:{
    type: String,
    enum: ["mounthly","yearly"],
    default: "mounthly"
}
});

module.exports = {Budget};

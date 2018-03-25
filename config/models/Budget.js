var mongoose = require('mongoose');

var Budget = mongoose.model('Budget', {
    subCatId: {
        type: String,
        unique:true,
        minlength: 1,
        trim: true
    },
  catId: {
    type: String,
    required: true,
    index:true,
    minlength: 1,
    trim: true
  },
  budget:{
    type: Number,
    required : true,
    default: 0
  },
  estimateTime:{
    type: String,
    enum: ["mounthly","yearly"],
    required:true,
    default: "mounthly"
}
});

module.exports = {Budget};

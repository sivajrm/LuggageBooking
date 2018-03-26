var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  tasty:Boolean
});

var food = mongoose.model('Food', foodSchema);
module.exports=food;
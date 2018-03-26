var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age:Number,
  phone: String,
  email:String 
});

var Person = mongoose.model('Person', personSchema);
module.exports=Person;
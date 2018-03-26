//foods collection of the Factory database
var mongoose = require('mongoose');
var Schema = mongoose.Schema({
  name: String,
  tasty:Boolean
});
module.exports = mongoose.model("foods", Schema);

//main application

var express = require('express')
var app = express()

var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

config = require('./config/configure'),
app = config(app);
/*app.get('/', function (req, res) {
  //res.send('Hello World!')
  //res.json({ message: 'horay! welcome to our api!' });
})*/

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/mean';
// Connection URL
var food = [{
'name': 'Chicken',
'tasty': true
},{
'name': 'pavakai',
'tasty': false
}];

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  //Factory database
  var dbo = db.db("Factory");
  //foods collection
  dbo.collection("foods").insert(food,function(error,result){
//here result will contain an array of records inserted
  if(!error) {
		console.log("Success :"+result.ops.length+" food inserted!");
  } else {
		console.log("Some error was encountered!");
  }
});
  dbo.collection("foods").find({}).toArray(function(err, result) {
    if (err) 
    	console.log(err);
    else
    	console.log(result);
    db.close();
  });
});

// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8000/api)
/*
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
*/

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
//main application
var mongoose = require('mongoose');
 mongoose.Promise = require('bluebird');
var Person = require('./person/person');
var Food = require('./person/food');
var express = require('express')
var app = express()

var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

config = require('./config/configure'),
app = config(app);


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

var testPerson = new Person({
        _id: new mongoose.Types.ObjectId(),
        name:'Siva',
        age: 23,
        phone: '408-504-7702',
        email: 'test@gmail.com'
    });
    


var dbo,db2;       
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  //Factory database

  dbo = db.db("Factory");
  db=dbo;
  //foods collection
  //dbo.collection("person").insert(testPerson,function(error,result){
//here result will contain an array of records inserted
  //if(!error) {
//		console.log("Success :"+result.ops.length+" person inserted!");
 // } else {
 	//	console.log("Some error was encountered!");
 // }
//});
  /*dbo.collection('person').save(function(err) {
  	    console.log("exec save block");
        if (err) throw err;
        console.log('Person successfully saved.');
   });
  /*dbo.collection("foods").insert(food,function(error,result){
//here result will contain an array of records inserted
  if(!error) {
		console.log("Success :"+result.ops.length+" food inserted!");
  } else {
		console.log("Some error was encountered!");
  }
});*/
  

  dbo.collection("foods").find({}).toArray(function(err, result) {
    if (err) 
    	console.log(err);
    else
    	console.log(result);
    //db.close();
  });
});

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = dbo.collection(collectionName)
  return next()
});
/*
app.get('/collections/:collectionName',function(req,res){
	var db = req.db;
    var collection = db.get('foods');
    var wines = collection.find(function(e, docs){
        res.send(docs);
    });
});
*/



app.get('/collections/:collectionName',function(req,res,next){
	console.log("get activities"+req+" "+req.collection);
	dbo.collection("foods").find({}).toArray(function(err, result) {
	//dbo.collection("foods").find({},function (err, foodRes) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        console.log("Exec/..."+JSON.stringify(result));
        res.send(result);
    });
 });
//app.use('/',router);
app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
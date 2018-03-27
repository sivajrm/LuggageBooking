//main application
var mongoose = require('mongoose');
 mongoose.Promise = global.Promise;

var FoodModel = require('./models/food');
var express = require('express')
var app = express()

var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

config = require('./config/configure'),
app = config(app);

// Connection URL
var url = 'mongodb://localhost:27017/Factory';
// Connection URL

mongoose.Promise = global.Promise;

mongoose.connect(url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})




/*
app.param('collectionName', function(req, res, next, collectionName){
  req.collection = dbo.collection(collectionName)
  return next()
});
*/

app.get('/collections/:collectionName',function(req,res){
	var db = req.db;
    var collection = db.get('foods');
    var wines = collection.find(function(e, docs){
        res.send(docs);
    });
});

/*
app.get('/collection/:collectionName',function(req,res,next){
	console.log("outside and infinite");
	FoodModel.findById(req.params.collectionName,function(err, notes){
		console.log("inside and infinite:"+req.params.collectionName);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.send(notes);
        }
    });
});
*/
/*
app.post('/collection',function(req,res,next){
	console.log("outside and infinite");
	if(!req.body.content) {
        return res.status(400).send({message: "message can not be empty"});
    }
	    console.log("inside post");
		console.log("n: "+req.body.name+"\nt:"+req.body.tasty); 
		res.send({message: "Success"});
});

app.get('/collections/:collectionName',function(req,res,next){
	console.log("get activities"+req+" "+req.params.collectionName);
	var colln=req.params.collectionName;
	//dbo.collection(colln).find({}).toArray(function(err, result) {
	Food.find({}).toArray(function (err, foodRes) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        console.log("Exec/..."+JSON.stringify(result));
        res.send(result);
    });
 });
 */
require('./route/routes.js')(app)
app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
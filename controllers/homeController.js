 
var FoodModel = require('../models/food');
exports.root = function(req, res) {
	console.log("root executing:");
	res.send({status:"Server on and running.."});
};
exports.notFound = function(req, res) {
	console.log("Not found");
	res.send({status:"Server could not find the page.."});
};
exports.create = function(req, res) {
	console.log("outside and infinite:",req.body);
	if(!req.body) {
    	return res.status(400).send({message:"body can not be empty"});
    }
	console.log("inside post:",req.url);
	console.log("n: "+req.body.name+"\nt:"+req.body.tasty); 
	var p = new FoodModel(); 
	console.log("n: "+req.body.name+"\nt:"+req.body.tasty); 
    p.name = req.body.name;  
    p.tasty = req.body.tasty;  
    p.save(function (err) {  
    	if (err) {  
            res.send(err);  
        }  
        else{
        	console.log('Added food...');
        	res.send({ message: 'food Created !' })
        }
    });  
};

exports.index = function(req,res){
	console.log("execute all:");
	FoodModel.find({},function(err, foods){
		console.log("inside all");
    	if(err) {
    		console.log("Other err");
        	res.status(500).send({message: "Some error occurred while retrieving notes."});
    	} else {
       		console.log("retrieving all");
        	res.json(foods);
    	}
  	});
};
exports.getDocForID = function(req,res){
	console.log("execute getByID:"+req.params._foodId);
	FoodModel.findById(req.params._foodId,function(err, foods){
		console.log("inside homeController:"+req.params._foodId);
   		if(err) {
    	    console.log("Other err");
        	res.status(500).send({message: "Some error occurred while retrieving notes."});
    	} else {
        	console.log("retrieving getByID");
        	res.json(foods);
    	}
    });
};


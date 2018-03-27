 
var FoodModel = require('../models/food');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
exports.root = function(req, res) {
	console.log("root executing:");
	res.send({status:"Server on and running.."});
};

exports.notFound = function(req, res) {
	console.log("Not found");
	res.send({status:"Server could not find the page.."});
};

exports.update = function(req,res){
	FoodModel.findByIdAndRemove(req.params._foodId, function(err, note) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Food not found with id " + req.params.noteId});                
            }
            return res.status(500).send({message: "Could not delete food with id " + req.params.noteId});
        }

        if(!note) {
            return res.status(404).send({message: "Food not found with id " + req.params.noteId});
        }
        console.log("Food deleted successfully");
        res.send({message: "Food deleted successfully!"})
    });
}

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
            return res.send(err);  
        }  
        else{
        	console.log('Added food...');
        	return res.send({ message: 'food Created !' })
        }
    });  
};

exports.getAll = function(req,res){
	console.log("execute all:");
	FoodModel.find({},function(err, foods){
		console.log("inside all");
    	if(err) {
    		console.log("Other err");
        	return res.status(500).send({message: "Some error occurred while retrieving notes."});
    	} else {
       		console.log("retrieving all");
        	return res.json(foods);
    	}
  	});
};

exports.getDocForID = function(req,res){
	console.log("execute getByID:"+req.params._foodId);
	FoodModel.findById(req.params._foodId,function(err, foods){
		console.log("inside homeController:"+req.params._foodId);
   		if(err) {
    	    console.log("Other err:"+err);
        	return res.status(500).send({message: "Some error occurred while retrieving notes."});
    	} else {
        	console.log("retrieving getByID");
        	if(!foods) {
           		return res.status(404).send({message: "Food not found with id " + req.params._foodId});
        	}
        	return res.json(foods);
    	}
    });
};

exports.delete = function(req,res){
	FoodModel.findByIdAndRemove(mongoose.Types.ObjectId(req.params._foodId), function(err, food) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Food not found with id " + req.params._foodId});                
            }
            return res.status(500).send({message: "Could not delete food with id" + req.params._foodId});
        }

        if(!food) {
        	return res.status(404).send({message: "Food not found with id " + req.params._foodId});
        }
        console.log("Food deleted successfully");
        return res.send({message: "Food deleted successfully!"})
    });
}




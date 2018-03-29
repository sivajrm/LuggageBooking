 
//var FoodModel = require('../models/food');
var UserModel = require('../models/user');
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
	UserModel.findById(mongoose.Types.ObjectId(req.params._userId), function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params._userId});                
            }
            return res.status(500).send({message: "Error finding user with id " + req.params._userId});
        }

        if(!user) {
            return res.status(404).send({message: "User not found with id " + req.params._userId});            
        }

        user.email = req.body.email;
        user.phone = req.body.phone;

        user.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update user with id " + req.params._userId});
            } else {
            	console.log("Updated successfully");
                res.send("{message: "+data+"}");
            }
        });
    });
}

exports.create = function(req, res) {
	console.log("outside and infinite:",req.body);
	if(!req.body) {
    	return res.status(400).send({message:"body can not be empty"});
    }
	console.log("inside post:",req.url);
	console.log("name: "+req.body.name+"\nemail:"+req.body.email+"\nphone:"+req.body.phone); 
	var p = new UserModel(); 
	p.name = req.body.name;  
    p.email = req.body.email; 
    p.phone = req.body.phone;
    p.username = req.body.username;
    p.password = req.body.password; 
    p.save(function (err) {  
    	if (err) {  
            return res.send(err);  
        }  
        else{
        	console.log('Added user...');
        	return res.send({ message: 'User Created !' })
        }
    });  
};

exports.getAll = function(req,res){
	console.log("execute all:");
	UserModel.find({},function(err, users){
		console.log("inside all");
    	if(err) {
    		console.log("Other err");
        	return res.status(500).send({message: "Some error occurred while retrieving users."});
    	} else {
       		console.log("retrieving all");
        	return res.json(users);
    	}
  	});
};

exports.getDocForID = function(req,res){
	console.log("execute getByID:"+req.params._userId);
	UserModel.findById(req.params._userId,function(err, user){
		console.log("inside homeController:"+req.params._userId);
   		if(err) {
    	    console.log("Other err:"+err);
        	return res.status(500).send({message: "Some error occurred while retrieving users."});
    	} else {
        	console.log("retrieving getByID");
        	if(!user) {
           		return res.status(404).send({message: "User not found with id " + req.params._userId});
        	}
        	return res.json(user);
    	}
    });
};

exports.delete = function(req,res){
	UserModel.findByIdAndRemove(mongoose.Types.ObjectId(req.params._userId), function(err, user) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "User not found with id " + req.params._userId});                
            }
            return res.status(500).send({message: "Could not delete user with id" + req.params._userId});
        }
        console.log("User deleted successfully");
        return res.send({message: "User deleted successfully!"})
    });
}




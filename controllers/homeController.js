 
var UserModel = require('../models/user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var config = require('../config/configure');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.root = function(req, res) {
	console.log("root executing:");
	res.send({status:"Server on and running.."});
};

exports.notFound = function(req, res) {
	console.log("Not found");
	res.send({status:"Server could not find the page.."});
};

exports.update = function(req,res,next){
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

exports.signup = function(req, res) {
	var hashedPassword = bcrypt.hashSync(req.body.password, 8)
	if(!req.body) {
    	return res.status(400).send({message:"body can not be empty"});
    }
	var p 		= new UserModel(); 
	p.name 		= req.body.name;  
    p.email 	= req.body.email; 
    p.phone 	= req.body.phone;
    p.username  = req.body.username;
    p.password  = hashedPassword; 
    p.save(function (err,user) {  
    	if (err) {  
            return res.send(err);  
        }  
        else{
        		// create a token
    			var token = jwt.sign({ id: user._id }, config.get().crypt.secret, {
    			expiresIn: 86400 // expires in 24 hours
    	    });
    		res.status(200).send({ auth: true, token: token, message: 'User Created !' });
        	console.log('Added user with auth:'+token);
        }
    });  
};

exports.getAll = function(req,res,next){
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

exports.getDocForID = function(req,res,next){
	console.log("execute getByID:"+req.params._userId);
	UserModel.findById(req.params._userId,function(err, user){
		console.log("inside homeController:"+req.params._userId);
   		if(err) {
    	   return res.status(500).send({message: "Some error occurred while retrieving users."});
    	} else {
        	if(!user) {
           		return res.status(404).send({message: "User not found with id " + req.params._userId});
        	}
        	return res.json(user);
    	}
    });
};

exports.delete = function(req,res,next){
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

exports.getUserFromToken = function(req,res,next){
	/*Uses the decoded user id from the supplied authtoken to retrieve user object*/
    UserModel.findById(req.userId,{ password: 0 },function (err, user) {
  		if (err) 
  			return res.status(500).send("There was a problem finding the user.");
  		if (!user) 
  			return res.status(404).send("No user found.");
  		res.status(200).send(user);
  	});
}

exports.validateLogin = function(req,res,next){
	UserModel.findOne({ email: req.body.email }, function (err, user) {
    	if (err) 
    		return res.status(500).send('Error on the server.');
    	if (!user) 
    		return res.status(404).send('No user found.');
    	console.log("password:"+user.password);
    	var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    	if (!passwordIsValid) 
    		return res.status(401).send({ auth: false, token: null });
    	var token = jwt.sign({ id: user._id }, config.get().crypt.secret, {
      	expiresIn: 86400 // expires in 24 hours
    	});
    	res.status(200).send({ auth: true, token: token });
  });
}


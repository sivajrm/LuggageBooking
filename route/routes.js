var express = require('express'),
router = express.Router(),
home =require('../controllers/homeController');
module.exports = function(app){
	app.get('/',home.root);	                        //root of the server
	app.get('/users',home.getAll);					//get all users
	app.get('/users/:_userId',home.getDocForID);	//get the users by id
	app.get('/*',home.notFound);					//get -not found
	app.post('/users',home.create);					//add a new user
	app.put('/users/:_userId',home.update);			//update an existing user
	app.delete('/users/:_userId',home.delete);		//delete an existing user
};


	
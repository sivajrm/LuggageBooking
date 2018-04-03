var express = require('express'),
router = express.Router(),
home =require('../controllers/homeController'),
authController = require('../controllers/Auth/AuthController');

module.exports = function(app){
	app.get('/',home.root);	                            //root of the server
	app.post('/user/signup',home.signup);				//add a new user     			returns authtoken 
	app.post('/user/login',home.validateLogin);			//validates login credentials 	returns authtoken
	app.use(authController.verifyToken);
	app.get('/users/all',home.getAll);					//get all users
	app.get('/user/identify',home.getUserFromToken);	//get user id from token      	returns ID of the user
	app.get('/users/:_userId',home.getDocForID);		//get the users by id
	app.put('/user/update/:_userId',home.update);		//update an existing user
	app.delete('/user/delete/:_userId',home.delete);	//delete an existing user
	app.get('/*',home.notFound);						//get -not found	
};


	
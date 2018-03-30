var express = require('express'),
router = express.Router(),
home =require('../controllers/homeController');
module.exports = function(app){
	app.get('/',home.root);	                            //root of the server
	app.post('/auth/login',home.validateLogin);			//validate login through supplied credentials   returns authtoken
	app.get('/users/all',home.getAll);					//get all users
	app.get('/user/identify',home.getUserFromToken);	//get user id from token                   		returns ID of the user
	app.get('/users/:_userId',home.getDocForID);		//get the users by id
	app.get('/*',home.notFound);						//get -not found
	app.post('/user/signup',home.signup);				//add a new user     							returns authtoken 
	app.put('/user/update/:_userId',home.update);		//update an existing user
	app.delete('/user/delete/:_userId',home.delete);	//delete an existing user
};


	
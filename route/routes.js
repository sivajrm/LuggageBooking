var express = require('express'),
router = express.Router(),
home =require('../controllers/homeController');
module.exports = function(app){
	app.get('/',home.root);	                        //root of the server
	app.get('/foods',home.getAll);					//get all foods
	app.get('/foods/:_foodId',home.getDocForID);	//get the food by id
	app.get('/*',home.notFound);					//get  -not found
	app.post('/foods',home.create);					//add a new food
	app.put('/foods',home.update);					//update an existing food
	app.delete('/foods/:_foodId',home.delete);		//delete an existing food
};


	
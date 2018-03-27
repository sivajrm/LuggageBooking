var express = require('express'),
router = express.Router(),
home =require('../controllers/homeController');
module.exports = function(app){
	app.get('/',home.root);	                        //root of the server
	app.get('/foods',home.index);					//get all foods
	app.get('/foods/:_foodId',home.getDocForID);	//get the food by id
	app.get('/*',home.notFound);					//get  -not found
	app.post('/foods',home.create);					//add a new food
};
	
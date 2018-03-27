var express = require('express'),
router = express.Router(),
home =require('../controllers/homeController');
module.exports = function(app){
	app.get('/',home.root);	
	app.get('/foods',home.index);
	app.get('/foods:_foodId',home.getDocForID);
	app.post('/foods',home.create);
};
	
//module.exports=router;

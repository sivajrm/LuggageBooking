//test apis to simulate homeController working 
var FoodModel = require('../models/food');
exports.index = function(req,res){
	    console.log("execute in homeController");
		//res.json({ message: 'The home:index controller'+"id:"+req.params.food_id }); 
		FoodModel.find(function(err, foods){
		console.log("inside homeController");
        if(err) {
            console.log("Other err");
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.json(foods);
        }
    });
};

exports.create= function(req, res) {
		res.send('The food:create:'+req.params.food_id+' POST controller');
};
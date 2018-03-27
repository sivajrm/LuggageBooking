//test apis to simulate homeController working 
var FoodModel = require('../models/food');

exports.create = function(req, res) {
	 console.log("outside and infinite");
	//if(!req.body.content) {
      //  return res.status(400).send({message: "body can not be empty"});
    //}
	    console.log("inside post");
		console.log("n: "+req.body.name+"\nt:"+req.body.tasty); 
		//res.send({message: "Success"});
		var p = new FoodModel(); 
		console.log("n: "+req.body.name+"\nt:"+req.body.tasty); 
    p.name = req.body.name;  
    p.tasty = req.body.tasty;  
    p.save(function (err) {  
        if (err) {  
            res.send(err);  
        }  
        else
        	res.send({ message: 'food Created !' })
    });  
};
exports.index = function(req,res){
	    console.log("execute in homeController"+req.params.id);
		//res.json({ message: 'The home:index controller'+"id:"+req.params.foodID }); 
		FoodModel.findById(req.params.id,function(err, foods){
		console.log("inside homeController:"+req.params.id);
        if(err) {
            console.log("Other err");
            res.status(500).send({message: "Some error occurred while retrieving notes."});
        } else {
            res.json(foods);
        }
    });
};


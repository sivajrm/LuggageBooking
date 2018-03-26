//test apis to simulate homeController working 
module.exports = {
	index: function(req, res) {
		res.json({ message: 'The home:index controller'+"id:"+req.params.food_id }); 
		res.render('index', { title: 'Express' });
	},
	create: function(req, res) {
		res.send('The food:create:'+req.params.food_id+' POST controller');
	}
};
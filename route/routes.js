//routes to define the api routes
var express = require('express'),
router = express.Router(),
home = require('../controllers/homeController');
//image = require('../controllers/image');
module.exports = function(app) {
router.get('/', home.index);
router.get('/foods/:food_id', home.index);
router.post('/foods/:food_id', home.create);
//router.post('/foods/:food_id/', home.create);
//router.put('/foods/:food_id/name',home.name);
app.use(router);
};
var express = require('express'),
router = express.Router(),
home = require('../controllers/homeController'),
//image = require('../controllers/image');
module.exports = function(app) {
router.get('/', home.index);
router.get('/foods/:food_id', image.index);
//router.post('/images', image.create);
//router.post('/images/:image_id/like', image.like);
//router.post('/images/:image_id/comment', image.comment);
app.use(router);
};

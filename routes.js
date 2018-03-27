var express = require('express'),
router = express.Router({mergeParams: true}),
home = require('../controllers/homeController'),
//image = require('../controllers/image');
module.exports = function(app) {
app.get('/foods/:id',home.index);
app.post('/foods/',home.create);	

//router.post('/images/:image_id/like', image.like);
//router.post('/images/:image_id/comment', image.comment);
//app.use(router);
};

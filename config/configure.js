//Configuration file to facilitate the application
var path 	= require('path'),
routes 		= require('../route/routes'),
exphbs 		= require('express-handlebars'),
express 	= require('express'),
bodyParser 	= require('body-parser'),
cookieParser= require('cookie-parser'),
morgan 		= require('morgan'),
methodOverride = require('method-override'),
errorHandler   = require('errorhandler');
module.exports = function(app) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':true}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));
routes(app);//moving the routes to routes folder.
//app engine to render dynamic html
app.engine('handlebars', exphbs.create({
defaultLayout: 'main',
layoutsDir: app.get('views') + '/layouts',
partialsDir: [app.get('views') + '/partials']
}).engine);
app.set('view engine', 'handlebars');
return app;
}
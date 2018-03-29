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
	secret: 'supersecret'
	/*app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':true}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(cookieParser('some-secret-value-here'));*/
routes(app);
//moving the routes to routes folder.
return app;
};

var config = {
  default: {
    crypt: {
      key: 'the.express.session.id',
      secret: 'supersecret'
    },
    database: 'mongodb://localhost:27017/Factory',
  }
}

exports.get = function get(env) {
  return config[env] || config.default;
}

//main application
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var UserModel = require('./models/user');
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var morgan      = require('morgan');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
config = require('./config/configure'),
app = config(app);

// Connection URL
var url = 'mongodb://localhost:27017/Factory';

mongoose.Promise = global.Promise;

mongoose.connect(url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

require('./route/routes.js')(app)
app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
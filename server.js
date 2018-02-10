// define app dependencies

// express is a node.js framework used to write server-side javascript
// require is a built in node.js module that specifies individual dependencies needed to run app
var express = require('express'),
    // execute and run the express webserver
    app = express(),
    // require and configure dotenv file
    dotenv = require('dotenv').config(),
    // parses/analyzes endpoint stream data into json
    bodyParser = require('body-parser'),
    // templating engine to display static web pages
    engines = require('consolidate'),
    // error handling
    assert = require('assert'),
    moment = require('moment');

// set where the view templates are located
// ___dirname allows full path to directory to views
app.set('views', __dirname + '/public/views');
// use templating engine to render files with html extensions using nunjucks library
app.engine('html', engines.nunjucks);
// middleware to serve static files(css, javascript) into the application
app.use(express.static('public'));
// parse text as URL enapp.use(express.static(__dirname + '/public'));coded data(how browsers tend to send data from regular forms set to post)
// data is exposed on a resulting object on req.body
app.use(bodyParser.urlencoded({ extended: true }));
// parse data as a json object
app.use(bodyParser.json());

// execute route function with express server passed in as a parameter
var routes = routes = require('./public/scripts/routes.js')(app, moment);

// set port of app
var port = process.env.PORT || 8080;

// listen for connection if success execute a callback function that logs that the server is listening
var server = app.listen(port, function() {
  console.log("Express server is listening on port %s.", port);
});

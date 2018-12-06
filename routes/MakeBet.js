var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/Database');
// Required to use the path.join function



app.get('/', function(req, res){

	console.log(req);

});
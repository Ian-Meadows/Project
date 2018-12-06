var express = require('express');
var app = express();



var db = require('../database/Database');

app.get('/', function(req, res){
	console.log(req)

}

module.exports = app;
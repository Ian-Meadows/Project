var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/Database');

app.get('/', function(req, res){

	var groupInfo = req.query;
	if(groupInfo.GroupName != ''){
		//might want to check if group already exists
		//TODO: create query
		var query = '';
		db.none(query)
			.then(function(result){

			});
	}



});
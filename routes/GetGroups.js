var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/Database');


app.get('/', function(req, res){
	var query = '';

	db.any(query)
	.then(function(rows){
		console.log(rows);
		var data = {
			rows:rows,
			success:"true"
		};

		res.status(200)
            .json(rows)
            .end();

	})
	.catch(function(err){
		var data = {
			rows:"false",
			success:"false"
		};

		res.status(200)
            .json(rows)
            .end();
	});
});


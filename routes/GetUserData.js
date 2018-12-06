var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/Database');


app.get('/', function(req, res){

	var userInfo = req.query;

	var username = userInfo.username;

	var getUser = 'Select * FROM users WHERE username=$1';
	db.any(getUser, username)
		.then(function(data){
			if(data.length == 1){
				SendBackMessage(res, data, "true");
			}
			else{
				SendBackMessage(res, "user does not exist", "false");
			}
		})
		.catch(function(data){
			SendBackMessage(res, "Database error", "false");
	});


});

function SendBackMessage(res, msg, status){
	var jmessage = {
		message:msg,
		success:status
	};

	res.status(200)
		.json(jmessage)
		.end();
}


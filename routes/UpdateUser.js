var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/database');

app.get('/', function(req, res){



	var userInfo = req.query;

	var oldUsername = userInfo.oldUsername;
	var username = userInfo.username;
	var password = userInfo.password;
	var email = userInfo.email;

	var updateUser = 'UPDATE users SET username=$2, email=$3, password=$4 WHERE username=$1;';
	db.none(updateUser, [oldUsername, username, email, password])
		.then(function(data){
			SendBackMessage(res, "true");
		})
		.catch(function(err){
			console.log(err);
			SendBackMessage(res, "failed to update user");
		});

});

function SendBackMessage(res, msg){
	var jmessage = {
		message:msg
	};

	res.status(200)
		.json(jmessage)
		.end();
}
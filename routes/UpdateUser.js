var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/Database');

app.get('/', function(req, res){

	var userInfo = req.query;

	var oldUsername = req.oldUsername;
	var username = req.username;
	var password = req.password;
	var email = req.email;

	var updateUser = 'UPDATE game SET username=$2, email=$3, password=$4 WHERE username=$1;';
	db.none(updateUser, [oldUsername, username, password, email])
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
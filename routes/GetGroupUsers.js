var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/database');

app.get('/', function(req, res){

	var query = req.query;
	var groupID = query.groupID;

	var getUsersByGroup = 'SELECT * FROM users INNER JOIN usergroup ON users.id=usergroup.userid WHERE usergroup.groupid=$1';
	
	db.any(getUsersByGroup, groupID)
		.then(function(data){
			SendBackMessage(res, data);
		})
		.catch(function(err){
			console.log(err);
			SendBackMessage(res, "false");
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
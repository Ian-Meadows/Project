var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/Database');


app.get('/', function(req, res){


	var pollInfo = req.query;

	var query = 'UPDATE grouptable SET poll=$2, option1=$3, option2=$4, pollstatus=$5, betson1=0, betson2=0, pollson1=0, pollson2=0 WHERE id=$1;';
	db.none(query, [pollInfo.groupID, pollInfo.poll, pollInfo.pollOption1, pollInfo.pollOption2, "polling"])
		.then(function(data){
			SendBackMessage(res, "true");
		})
		.catch(function(err){
			console.log(err);
			SendBackMessage(res, "failed to create poll");
		});




});

function SendBackMessage(res, str){
	var jmessage = {
		message:str
	};

	res.status(200)
		.json(jmessage)
		.end();
}
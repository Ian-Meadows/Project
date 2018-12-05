var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/Database');

app.get('/', function(req, res){


	var pollInfo = req.query;

	var query='';

	if(pollInfo.updateType == "poll1"){
		query = 'UPDATE grouptable SET pollson1=pollson1+1 WHERE id=$1;';
	}
	else if(pollInfo.updateType == "poll2"){
		query = 'UPDATE grouptable SET pollson2=pollson2+1 WHERE id=$1;';
	}
	else if(pollInfo.updateType == "bet1"){
		query = 'UPDATE grouptable SET betson1=betson1+1 WHERE id=$1;';
	}
	else if(pollInfo.updateType == "bet2"){
		query = 'UPDATE grouptable SET betson2=betson2+1 WHERE id=$1;';
	}

	//var query = 'UPDATE grouptable SET poll=$2, option1=$3, option2=$4, pollstatus=$5, betson1=0, beston2=0, pollson1=0, pollson2=0 WHERE id=$1;';
	db.none(query, pollInfo.groupID)
		.then(function(data){
			SendBackMessage(res, "worked");
		})
		.catch(function(err){
			console.log(err);
			SendBackMessage(res, "failed to update Poll");
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
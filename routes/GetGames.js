var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/Database');

app.get('/', function(req, res){

	var info = req.query;

	var username = info.username;
	var games = info.games;



	//insert games if they dont exist
	for(var i = 0; i < games.length; i++){
		var getGame = 'SELECT * game where id=$1';
		db.any(getGame, games[i].gsis)
			.then(function(data){
				if(data.length == 0){
					//game does not exist so insert Game
					var insertGame = 'INSERT INTO game(id, home, homescore ,visitor, visitorscore, startdate, dayofweek, status) values($1, $2, $3, $4, $5, $6, $7, $8);';
					db.none(insertGame, [games[i].gsis, games[i].hnn, games[i].hs, games[i].vnn, games[i].vs, games[i].eid, games[i].d, games[i].q])
						.then(function(data){
							console.log('inserted game');
						})
						.catch(function(err){
							console.log(err);
					});
				}
				else{
					//game exists so update table with values
					var updateGame = 'UPDATE game SET homescore=$2, visitorscore=$3, status=$4 WHERE id=$1;';
					db.none(updateGame, [games[i].gsis, games[i].hs, games[i].vs, games[i].q])
						.then(function(data){
							console.log('updated game');
						})
						.catch(function(err){
							console.log(err);
					});

				}
			})
			.catch(function(err){

		});
	}


	//get games that are upcoming and send it



});


function SendBackMessage(res, str){
	var jmessage = {
		message:str
	};

	res.status(200)
		.json(jmessage)
		.end();
}
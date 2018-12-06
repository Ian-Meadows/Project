var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/Database');

app.get('/Insert', function(req, res){

	var info = req.query;

	var username = info.username;
	var games = info.games;

	var top = games[0].gsis;
	var bottom = games[games.length - 1].gsis;

	var getGame = 'SELECT * FROM game WHERE id>$1 - 1 AND id < $2 + 1';
	db.any(getGame, [top, bottom])
		.then(function(data){
			if(data.length < games.length){
				for(var i = 0; i < games.length; i++){
					var exists = false;
					for(var j = 0; j < data.length; j++){
						if(data[j].id == games[i].gsis){
							exists = true;
							break;
						}
					}
					if(exists){
						var updateGame = 'UPDATE game SET homescore=$2, visitorscore=$3, status=$4 WHERE id=$1;';
						db.none(updateGame, [games[i].gsis, games[i].hs, games[i].vs, games[i].q])
							.then(function(data){
								console.log('updated game');
							})
							.catch(function(err){
								console.log(err);
						});
					}
					else{
						var insertGame = 'INSERT INTO game(id, home, homescore ,visitor, visitorscore, startdate, dayofweek, status) values($1, $2, $3, $4, $5, $6, $7, $8);';
						db.none(insertGame, [games[i].gsis, games[i].hnn, games[i].hs, games[i].vnn, games[i].vs, games[i].eid.substring(0, games[i].eid.length - 2), games[i].d, games[i].q])
							.then(function(data){
								console.log('inserted game');
							})
							.catch(function(err){
								console.log(err);
						});
					}
				}
			}
			else if(data.length > games.length){
				console.log('wtf');
			}
			else{
				for(var i = 0; i < games.length; i++){
					var updateGame = 'UPDATE game SET homescore=$2, visitorscore=$3, status=$4 WHERE id=$1;';
					db.none(updateGame, [games[i].gsis, games[i].hs, games[i].vs, games[i].q])
						.then(function(data){
							console.log('updated game');
						})
						.catch(function(err){
							console.log(err);
					});
				}
			}
		})
		.catch(function(err){
			console.log(err);
	});



});

app.get('/Get', function(req, res){

	var info = req.query;

	var getGames = 'SELECT * FROM game;';


	db.any(getGames)
		.then(function(data){
			SendBackMessage(res, data);
		})
		.catch(function(err){
			SendBackMessage(res, "Unable to get Games");
			console.log(err);
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
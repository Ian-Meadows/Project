var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/database');

app.get('/Insert', function(req, res){

	var info = req.query;

	var username = info.username;
	var games = info.games;

	var top = games[0].gameId;
	var bottom = games[games.length - 1].gameId;

	var getGame = 'SELECT * FROM game WHERE id>$1 - 1 AND id < $2 + 1';
	db.any(getGame, [top, bottom])
		.then(function(data){
			if(data.length < games.length){
				for(var i = 0; i < games.length; i++){
					var exists = false;
					for(var j = 0; j < data.length; j++){
						if(data[j].id == games[i].gameId){
							exists = true;
							break;
						}
					}
					if(exists){
						if(games[i].status === 'F' || games[i].status === 'FO'){
							GameFinished(res, games[i].gameId);
							//games[i].status = 'D';
						}
						var updateGame = 'UPDATE game SET homescore=$2, visitorscore=$3, status=$4 WHERE id=$1;';
						db.none(updateGame, [games[i].gameId, games[i].homeTeamScore, games[i].visitorTeamScore, games[i].status])
							.then(function(data){
								//console.log('updated game');
							})
							.catch(function(err){
								console.log(err);
						});
					}
					else{
						var insertGame = 'INSERT INTO game(id, home, homescore ,visitor, visitorscore, startdate, dayofweek, status) values($1, $2, $3, $4, $5, $6, $7, $8);';
						db.none(insertGame, [games[i].gameId, games[i].homeNickname, games[i].homeTeamScore, games[i].visitorNickname, games[i].visitorTeamScore, games[i].edate, games[i].day, games[i].status])
							.then(function(data){
								//console.log('inserted game');
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
					if(games[i].status === 'F' || games[i].status === 'FO'){
						GameFinished(res, games[i].gameId);
						//games[i].status = 'D';
					}
					var updateGame = 'UPDATE game SET homescore=$2, visitorscore=$3, status=$4 WHERE id=$1;';
					db.none(updateGame, [games[i].gameId, games[i].homeTeamScore, games[i].visitorTeamScore, games[i].status])
						.then(function(data){
							//console.log('updated game');
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


function GameFinished(res, gameID){

	//var gameID = msg.gameId;

	var getGame = 'SELECT * FROM game WHERE id=$1;';

	var homeTeam = "";
	var awayTeam = "";

	var winningTeam = "";

	var winningBets = 0;

	//console.log("GamesUpdating");

	var jackpot = 0;

	db.any(getGame, gameID)
		.then(function(data){
			if(data.length == 1){
				//set team names
				if(data[0].homescore > data[0].visitorscore){
					winningTeam = data[0].home;
				}
				else{
					winningTeam = data[0].visitor;
				}

				var getBets = 'SELECT * FROM bets WHERE gameid=$1;';
				db.any(getBets, data[0].id)
					.then(function(data){
						//get total jackpot
						//setup side bets
						for(var i = 0; i < data.length; i++){
							jackpot+=data[i].bet;
							if(winningTeam === data[i].team){
								winningBets+=data[i].bet;
							}

						}

						//update user funds
						for(var i = 0; i < data.length; i++){
							if(data[i].team == winningTeam){
								var percent = data[i].bet / winningBets;
								var totalWon = jackpot*percent;
								UpdateUserFund(data[i].userid, totalWon);
							}
							
						}

					})
					.catch(function(err){
						console.log(err);
					});
			}
			else{
				console.log("ERROR: group does not exist");
			}
			
		})
		.catch(function(err){
			console.log(err);
	});

}

function UpdateUserFund(userID, fundsToAdd){

	var updateUser = 'UPDATE users SET funds=funds+$2 WHERE id=$1;';
	db.any(updateUser, [userID, fundsToAdd])
		.then(function(data){
			console.log("funds added");
		})
		.catch(function(err){
			console.log(err);
	});

}


function SendBackMessage(res, msg){
	var jmessage = {
		message:msg
	};

	res.status(200)
		.json(jmessage)
		.end();
}
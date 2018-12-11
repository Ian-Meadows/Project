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

	var getGame = 'SELECT * FROM game';
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
							games[i].status = 'D';
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
						games[i].status = 'D';
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

	var groupBets = [];

	groupBets.push(new GroupBets(null, true));

	var getGroups = 'SELECT * FROM grouptable';

	db.any(getGroups)
		.then(function(data){
			for(var i = 0; i < data.length; i++){

				groupBets.push(new GroupBets(data[i].id, false));
			}

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

								//init groups
								for(var i = 0; i < data.length; i++){
									var groupIndex = 0;
									for(var j = 0; j < groupBets.length; j++){
										if(data[i].groupid == null){
											groupIndex = 0;
											break;
										}
										else if(data[i].groupid == groupBets[j].groupID){
											groupIndex = j;
											break;
										}
									}
									groupBets[groupIndex].AddBets(data[i]);
									groupBets[groupIndex].SetWinningTeam(winningTeam);

								}

								//get total jackpot
								//setup side bets
								for(var i = 0; i < groupBets.length; i++){
									
									groupBets[i].SetUpJackpot();
									groupBets[i].SetUpPayout();
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

class GroupBets{



	constructor(groupID, isGlobal){
		this.groupID = groupID;
		this.isGlobal = isGlobal;
		this.bets = new Array();
		this.winningTeam = "";
		this.winningBets = 0;
		this.jackpot = 0;
	}

	SetWinningTeam(winningTeam){
		this.winningTeam = winningTeam;
	}

	AddBets(bet){
		this.bets.push(bet);
	}

	SetUpJackpot(){
		for(var i = 0; i < this.bets.length; i++){
			this.jackpot += this.bets[i].bet;
			if(this.winningTeam === this.bets[i].team){
				this.winningBets+=this.bets[i].bet;
			}
		}
	}

	SetUpPayout(){
		for(var i = 0; i < this.bets[i].length; i++){
			if(this.bets[i].team == this.winningTeam){
				var percent = this.bets[i].bet / this.winningBets;
				var totalWon = this.jackpot*percent;
				UpdateUserFund(this.bets[i].userid, totalWon);
			}
		}
		
	}

	UpdateUserFund(userID, fundsToAdd){

		var updateUser = 'UPDATE users SET funds=funds+$2 WHERE id=$1;';
		db.any(updateUser, [userID, fundsToAdd])
			.then(function(data){
				console.log("funds added");
			})
			.catch(function(err){
				console.log(err);
		});

	}
}
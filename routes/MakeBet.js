var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/Database');
// Required to use the path.join function



app.get('/', function(req, res){


	var team = req.TeamName;
	var bet = req.Bets;
	var gameID = req.gameID;
	var user = req.UserName;
	var userID;
	var groupid = null;


	// 0 = home, 1 = away
	db.one('select ID from Users where Username = $1;', user)
		.then(function(incID){
			userID = incID;
			db.one('select funds from Users where Username = $1;', user)
				.then(function(funds) {
					if(bet <= funds){
						db.none('insert into bets(userid, gameid, groupid, bet) values($1, $2, $3, $4)', userID, gameID, groupid, bet)
							.then(function(funds){
								SendBackMessage(res, true);

							}).catch(function(err){
								console.log(err)
								SendBackMessage(res, "Bets failed to insert");
							});
					}else{
						SendBackMessage(res, "You do not have the right funds to bet on this!");
					}
				}).catch(function(err){
					console.log(err)
					SendBackMessage(res, "Unable to get funds from user");
				});
	}).catch(function(err){
		console.log(err)
		SendBackMessage(res, "Cannot get user ID");
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

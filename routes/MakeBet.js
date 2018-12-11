var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/database');
// Required to use the path.join function



app.get('/', function(req, res){

	var query = req.query;
	var team = query.TeamName;
	var bet = query.Bets;
	var gameID = query.gameID;
	var user = query.username;
	var userID;
	var groupid = query.groupid;
	var updatedFunds =0;




	// 0 = home, 1 = away
	db.one('select ID from Users where Username = $1;', [user])
		.then(function(incID){
			userID = incID.id;
			db.one('select funds from Users where Username = $1;', [user])
				.then(function(funds) {
					console.log(funds)
					if(bet <= funds.funds){
						updatedFunds = funds.funds - bet;
						db.none('update Users set funds=$1 where id = $2', [updatedFunds, userID])
							.then(function(result){
								db.none('insert into bets(userid, gameid, groupid, bet) values($1, $2, $3, $4)', [userID, gameID, groupid, bet])
								.then(function(funds){
									SendBackMessage(res, "true");
								}).catch(function(err){
									console.log(err)
									SendBackMessage(res, "Bets failed to insert");
								});
							}).catch(function(err){
								console.log(err)
								SendBackMessage(res, "Funds not updated");
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

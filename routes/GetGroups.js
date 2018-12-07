var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/database');


app.get('/', function(req, res){

	var userid = 0;

	
	

	var userInfo = req.query;
	var username = userInfo.username;

	var query1 = 'select ID from Users where Username = $1';
	db.one(query1, username)
	.then(function(data){
		userid = data.id;
		if(userid > 0){
			var query2 = 'select * from UserGroup inner join grouptable on UserGroup.GroupID=GroupTable.ID where UserGroup.UserID=$1';
			
			db.any(query2, userid)
			.then(function(rows){
				console.log(rows);
				var data = {
					rows:rows,
					success:"true"
				};

				res.status(200)
		            .json(rows)
		            .end();


			})
			.catch(function(err){
				var data = {
					rows:"false",
					success:"false"
				};

				res.status(200)
		            .json(rows)
		            .end();
		        console.log('ERROR: no groups');
			});
		}
	})
	.catch(function(err){
		console.log("ERROR: Failed to find user");
	});


	
	
});


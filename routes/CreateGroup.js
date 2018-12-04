var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/Database');

app.get('/', function(req, res){

	var groupInfo = req.query;
	var insertGroup = 'insert into grouptable(name, description, password, max_members) values($1, $2, $3, $4);';
	var insertUserGroup = 'insert into usergroup(groupid, userid) values($1, $2);';
	var userID;
	var groupID;
	
	req.assert('GroupName', 'GroupName is required').notEmpty();
	
	var errors = req.validationErrors();

	if(!errors){
		db.one('select ID from Users where Username = $1;', 'user')//groupInfo.username)
			.then(function(result){
				userID = result.id;

				
				db.none(insertGroup, [groupInfo.GroupName, groupInfo.GroupDes, groupInfo.GroupPassword, groupInfo.GroupUsers])
					.then(function(result){
						console.log("group inserted")

						db.one('select id from grouptable where name = $1;', groupInfo.GroupName)
							.then(function(result){
								groupID = result.id

								db.none(insertUserGroup, [groupID, userID])
								    .then(function(result){
								    	console.log('check usergroup table!!')

								    }).catch(function(err){
								    	console.log('failed insert to usergroup')
								});

							}).catch(function(err){
								console.log('error getting group id')
						});

					}).catch(function(err){
					            console.log(err)
					            console.log('error on group insert')
				});






			}).catch(function(err){
				console.log(err)
				console.log('error getting user id')
		});

		

		


		
			

	}else{
		console.log('error!! or just missing the group name');
	}

});


function checkCheckAvail(){

	console.log('Test')
	
}


function getUserID(username){
	
}


function getGroupID(groupname){
	

}

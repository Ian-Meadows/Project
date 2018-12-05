var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/Database');

app.get('/', function(req, res){

	var groupInfo = req.query;//                 1      2           3           4        5      6        7       8        9          10
	var insertGroup = 'insert into grouptable(name, description, password, groupowner, poll, option1, option2, betson1, betson2, pollstatus) values($1, $2, $3, $4, $5, $6, $7, 0, 0, $8);';
	var insertUserGroup = 'insert into usergroup(groupid, userid) values($1, $2);';
	var checkExisitingGroup = 'select name from grouptable where name=$1;'
	var userID;
	var groupID;
	
	req.assert('GroupName', 'GroupName is required').notEmpty();
	
	var errors = req.validationErrors();

	if(!errors){
		db.one('select ID from Users where Username = $1;', groupInfo.username)//groupInfo.username)
			.then(function(result){
				userID = result.id;

				db.any(checkExisitingGroup, [groupInfo.GroupName])
					.then(function(result){
						console.log('The existing group is:')
						console.log(result)

						
						
						if(result.length == 0){
							db.none(insertGroup, [groupInfo.GroupName, groupInfo.GroupDes, groupInfo.GroupPassword, groupInfo.username, "test poll", "test1", "test2", "not started"])
								.then(function(result){
									console.log("group inserted")

									db.one('select id from grouptable where name = $1;', groupInfo.GroupName)
										.then(function(result){
											groupID = result.id

											db.none(insertUserGroup, [groupID, userID])
											    .then(function(result){
											    	console.log('check usergroup table!!');
											    	SendBackMessage(res, "true");


											    }).catch(function(err){
											    	console.log('failed insert to usergroup');
											    	SendBackMessage(res, "failed to create group");
											});

										}).catch(function(err){
											console.log('error getting group id');
											SendBackMessage(res, "failed to create group");
									});

								}).catch(function(err){
								    console.log(err);
								    console.log('error on group insert');
								    SendBackMessage(res, "failed to create group");
							});
						}
						else{
							//group exists
							SendBackMessage(res, "group already exists");
						}

						

					}).catch(function(result){
						console.log('getting group name failed!');
						SendBackMessage(res, "failed to create group");
					})
				
				

			}).catch(function(err){
				console.log(err);
				console.log('error getting user id');
				SendBackMessage(res, "failed to create group");
		});
			

	}else{
		console.log('error!! or just missing the group name');
		SendBackMessage(res, "Stop hacking plz. could be us tho");
	}

});

function SendBackMessage(res, str){
	var jmessage = {
		message:str
	};

	res.status(200)
		.json(jmessage)
		.end();
}


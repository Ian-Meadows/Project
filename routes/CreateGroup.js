var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/Database');

app.get('/', function(req, res){

	var groupInfo = req.query;
	var insertGroup = 'insert into grouptable(name, description, password, max_members) values($1, $2, $3, $4);';
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
							db.none(insertGroup, [groupInfo.GroupName, groupInfo.GroupDes, groupInfo.GroupPassword, groupInfo.GroupUsers])
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
											    	SendBackMessage(res, "false");
											});

										}).catch(function(err){
											console.log('error getting group id');
											SendBackMessage(res, "false");
									});

								}).catch(function(err){
								    console.log(err);
								    console.log('error on group insert');
								    SendBackMessage(res, "false");
							});
						}
						else{
							//group exists
							SendBackMessage(res, "false");
						}

						

					}).catch(function(result){
						console.log('getting group name failed!');
						SendBackMessage(res, "false");
					})
				
				

			}).catch(function(err){
				console.log(err);
				console.log('error getting user id');
				SendBackMessage(res, "false");
		});
			

	}else{
		console.log('error!! or just missing the group name');
		SendBackMessage(res, "false");
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


var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/database');


app.get('/', function(req, res){

    var groupInfo = req.query;



    
    var groupName = groupInfo.groupName;
    var password = groupInfo.password;
    var username = groupInfo.username;
    var userID;
    var groupID;


    //TODO:Check if Group Exists
    var query1 = 'SELECT * FROM grouptable WHERE name=$1';
    var insertUserGroup = 'insert into usergroup(groupid, userid) values($1, $2);';
    //TODO: insert into database
    var checkIfUserExists = 'SELECT * FROM users WHERE username=$1';

    var checkIfUserAlreadyInGroup = 'SELECT * FROM usergroup WHERE userid=$1 AND groupid=$2';
    //get user
    db.any(checkIfUserExists, username)
        .then(function(data){
            if(data.length == 1){
                userID = data[0].id;
                //get group
                db.any(query1, groupName)
                    .then(function(data){
                        
                        if(data.length == 1){
                            var groupInfo = data[0];
                            if(groupInfo.password === "" || groupInfo.password === password){
                                groupID = groupInfo.id;
                                db.any(checkIfUserAlreadyInGroup, [userID, groupID])
                                    .then(function(data){
                                        if(data.length == 0){
                                            //can now join group
                                            //need to check if already in group
                                            //insert into group
                                            db.none(insertUserGroup, [groupID, userID])
                                                .then(function(result){
                                                    console.log('Joined Group');
                                                    SendBackMessage(res, "true");


                                                }).catch(function(err){
                                                    console.log('failed insert to usergroup');
                                                    SendBackMessage(res, "failed to join group");
                                            });
                                        }
                                        else{
                                            SendBackMessage(res, "Already in group");
                                        }
                                    })
                                    .catch(function(data){
                                        SendBackMessage(res, "failed to join group");
                                });
                                
                            }
                            else{
                                //failed to join
                                SendBackMessage(res, "Incorrect password or group name");
                            }
                        }
                        else{
                            //error
                            SendBackMessage(res, "Group does not exist");
                        }

                    })
                    .catch(function(err){
                        SendBackMessage(res, "failed to join group");
                        
                });
            }
            else{
                //fail
                SendBackMessage(res, "Please stop messing with the cookie.\n might be us tho");
            }
        })
        .catch(function(err){
            SendBackMessage(res, "failed to join group");
    });


        /*
    console.log(query);
    if(groupInfo.groupName === 'group' && groupInfo.password === 'password'){
        var r = {
            response:"true"
        };
        res.status(200)
            .json(r)
            .end();
    }
    else{
        var r = {
            respose:"false"
        };
        res.status(200)
            .json(r)
            .end();
    }
    */
});


function SendBackMessage(res, str){
    var jmessage = {
        message:str
    };

    res.status(200)
        .json(jmessage)
        .end();
}
var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/Database');


app.get('/', function(req, res){

    var groupInfo = req.query;



    
    var groupName = groupInfo.groupName;
    var password = groupInfo.password;

    //TODO:Check if Group Exists
    var query1 = '';

    //TODO: insert into database
    var query2 = '';

    db.one(query1)
        .then(function(data){
            //group exists
        })
        .catch(function(err){
            //group does not exist
            db.none(query2)
                .then(function(data){

                });
        })

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
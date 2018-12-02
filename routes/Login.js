var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/Database');

//req:request
//res:response
app.get('/', function(req, res){
    
    

    var login = req.query;

    //TODO: add query for login check
    var query = '';

    db.one(query)
        .then(function(data){
            //logged in
            var c = {
                //TODO:Use an actual cookie
                cookie:"true"
            };
            res.status(200)
                .json(c)
                .end();
        })
        .catch(function(data){
            //failed to login
            var c = {
                cookie:"false"
            };

            res.status(200)
                .json(c)
                .end();
        });

    /*
    if(login.username === 'user' && login.password === 'password'){
        var c = {
            cookie:"true"
        };
        res.status(200)
            .json(c)
            .end();
    }
    else{
        var c = {
            cookie:"false"
        };

        res.status(200)
            .json(c)
            .end();
    }
    */

});
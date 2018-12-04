var express = require('express');
var app = express();


module.exports = app;
var db = require('../database/Database');

//req:request
//res:response
app.get('/', function(req, res){
    
    req.assert('username', 'Username is required').notEmpty();
    req.assert('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    var login = req.query;

    if(!errors){
        var cleaned = {
            username: req.sanitize('username').escape().trim(),
            password: req.sanitize('password').escape().trim()
        };

        //TODO: add query for login check
        var query = 'select username, password from users where username=$1 and password=$2;';

        db.any(query, [cleaned.username,cleaned.password])
            .then(function(rows){

                rows = rows[0]

                console.log(cleaned.username, rows.username)
                console.log(cleaned.password, rows.password)

                if (cleaned.username == rows.username && cleaned.password == rows.password){
                    var c = {
                        //TODO:Use an actual cookie
                        cookie:rows.username,
                        passed:"true"
                    };
                    res.status(200)
                        .json(c)
                        .end();
                }
                else{
                    var c = {
                        cookie:"false",
                        passed:"false"

                    };

                    res.status(200)
                        .json(c)
                        .end();
                }
                    
                
                
            })
            .catch(function(data){

                var c = {
                        cookie:"false",
                        passed:"false"

                    };

                res.status(200)
                    .json(c)
                    .end();
                
            });

    }else{
        console.log('error!!');

        var error_msg = errors.reduce((accumulator, current_error)=> accumulator + '<br />' + current_error.msg, '');
        //req.flash('error', error_msg);

        console.log(error_msg);
        //response.render()
    }


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
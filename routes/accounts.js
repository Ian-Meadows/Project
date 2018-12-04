var express = require('express');
var app = express();

module.exports = app;
var db = require('../database/Database');
// Required to use the path.join function
var path = require('path');

const START_MONEY_AMOUNT = 100;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res){
    console.log('You did it!')
    // Validate user input
    req.assert('username', 'Username is required').notEmpty();
    req.assert('email', 'Email is required').notEmpty();
    req.assert('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if(!errors){
        var cleaned = {
            username: req.sanitize('username').escape().trim(),
            email : req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim()
        };

        // Need a way to check if username already exists
        // Need a way to validate password 
        var query = 'insert into users(username, email, password, funds) values($1, $2, $3, $4);';

        db.none(query, [cleaned.username, cleaned.email, cleaned.password, START_MONEY_AMOUNT])
            .then(function(result) {
                req.flash('success', 'Your account has been created successfully!');
                res.json({ success: 'true' });
                console.log("success");


                //response.render()
            }).catch(function (err) {
                req.flash('error', err);
                //response.render()
                console.log("catch");
                console.log(err);
            })
    }else{
        console.log('error!!');

        var error_msg = errors.reduce((accumulator, current_error)=> accumulator + '<br />' + current_error.msg, '');
        req.flash('error', error_msg);

        console.log(error_msg);
        //response.render()
    }
});



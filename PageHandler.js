var express = require('express');
var app = express();


app.get('/GroupJoinPage', function(req, res){
    res.sendfile('Public/html/GroupJoinPage.html');
});

app.get('/GroupCreationPage', function(req, res){
    res.sendfile('Public/html/GroupCreationPage.html');
});

app.get('/GroupPage', function(req, res){
    res.sendfile('Public/html/GroupPage.html');
});

app.get('/ProfilePage', function(req, res){
    res.sendfile('Public/html/ProfilePage.html');
});

app.get('/AccountCreationPage', function(req, res){
    res.sendfile('Public/html/AccountCreationPage.html');
});

app.get('/AfterLoginPage', function(req, res){
    res.sendfile('Public/html/AfterLoginPage.html');
});

app.get('/LoginPage', function(req, res){
    res.sendfile('Public/html/LoginPage.html');
});

app.get('/', function(req, res){
    //res.writeHeader(200, {"Content-Type":"text/html"});
    res.sendfile('Public/html/LandingPage.html');
    //res.sendfile('javascript/ClientSide/ConnectionTest.js');
    //res.end();
});





module.exports = app;


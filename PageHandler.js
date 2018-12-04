var express = require('express');
var app = express();


app.get('/GroupJoinPage', function(req, res){
    res.sendFile(__dirname + '/Public/html/GroupJoinPage.html');
});

app.get('/GroupCreationPage', function(req, res){
    res.sendFile(__dirname + '/Public/html/GroupCreationPage.html');
});

app.get('/GroupPage', function(req, res){
    res.sendFile(__dirname + '/Public/html/GroupPage.html');
});

app.get('/ProfilePage', function(req, res){
    res.sendFile(__dirname + '/Public/html/ProfilePage.html');
});

app.get('/AccountCreationPage', function(req, res){
    res.sendFile(__dirname +'/Public/html/AccountCreationPage.html');
});

app.get('/AfterLoginPage', function(req, res){
    res.sendFile(__dirname + '/Public/html/AfterLoginPage.html');
});

app.get('/LoginPage', function(req, res){
    res.sendFile(__dirname + '/Public/html/LoginPage.html');
});

app.get('/GroupList', function(req, res){
    res.sendFile(__dirname + '/Public/html/GroupList.html');
});

app.get('/', function(req, res){
    //res.writeHeader(200, {"Content-Type":"text/html"});
    res.sendFile(__dirname + '/Public/html/LandingPage.html');
    //res.sendFile('javascript/ClientSide/ConnectionTest.js');
    //res.end();
});

module.exports = app;


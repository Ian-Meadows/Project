var express = require('express');
var db = require('../database');
var app = express();
const querystring = require('querystring');
//const decodeUriComponentExt = require('decodeuricomponent');

//app.set('view engine', 'ejs');

app.use(express.static('Public'));
//app.use(express.static('javascript/ClientSide'));
//app.use(express.static('css'));
//app.use(express.static('html'));


var expressValidator = require('express-validator');
app.use(expressValidator());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('csci3308'));
app.use(session({
    secret: 'csci3308',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));
app.use(flash());


/*
var index = require('./routes/index');
var store = require('./routes/store');
app.use('/', index);
app.use('/store', store);
*/

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

app.get('/test', function (req, res){
    //console.log('yeet');

    var j = {
        message:"hi",
        value:20
    };

    res.status(200)
        .json(j)
        .end;
});

//req:request
//res:response
app.get('/Login', function(req, res){
    
    var query = req.query;
    if(query.username === 'user' && query.password === 'password'){
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

});

app.get('/JoinGroup', function(req, res){
    var query = req.query;
    console.log(query);
    if(query.groupName === 'group' && query.password === 'password'){
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
});


var port = 4000;
app.listen(port, function () {
    console.log('Server running on http://localhost:' + port)
});

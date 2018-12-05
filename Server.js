var express = require('express');
var app = express();
const querystring = require('querystring');

const START_MONEY_AMOUNT = 100;
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
    console.log(req.query)
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

/*
app.get('/CreateAccount', function(req, res){
    // Validate user input
    req.assert('username', 'Username is required').notEmpty();
    //req.assert('email', 'Email is required').notEmpty();
    req.assert('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if(!errors){
        var cleaned = {
            username: req.sanitize('username').escape().trim(),
            //email : req.sanitize('email').escape().trim(),
            password: req.sanitize('password').escape().trim()
        };

        // Need a way to check if username already exists
        // Need a way to validate password 

        var query = 'insert into users(username, email, password, funds) values($1, $2, $3, $4);';

        db.none(query, [cleaned.username, 'cleaned.email', cleaned.password, START_MONEY_AMOUNT])
            .then(function(result) {
                req.flash('success', 'Your account has been created successfully!');

                //response.render()
            }).catch(function (err) {
                req.flash('error', err);
                //response.render()
            })
    }else{
        console.log('error!!');

        var error_msg = errors.reduce((accumulator, current_error)=> accumulator + '<br />' + current_error.msg, '');
        req.flash('error', error_msg);

        console.log(error_msg);
        //response.render()
    }
});*/


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





var PageHandler = require('./PageHandler');
var CreateAccount = require('./routes/accounts');
var CreateGroup = require('./routes/CreateGroup');
var JoinGroup = require('./routes/JoinGroup');
var Login = require('./routes/Login');
var GetGroups = require('./routes/GetGroups');
var CreatePoll = require('./routes/CreatePoll');
var UpdatePoll = require('./routes/UpdatePoll');

app.use('/', PageHandler);
app.use('/CreateAccount', CreateAccount);
app.use('/CreateGroup', CreateGroup);
app.use('/JoinGroup', JoinGroup);
app.use('/Login', Login);
app.use('/GetGroups', GetGroups);
app.use('/CreatePoll', CreatePoll);
app.use('/UpdatePoll', UpdatePoll);


var port = 4000;
app.listen(port, function () {
    console.log('Server running on http://localhost:' + port)
});

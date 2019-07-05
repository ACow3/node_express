var express = require("express");
var path = require("path");
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

var counter = 0;


app.use(bodyParser.urlencoded({extended: true}));


app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }

}))


app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.get('/', function(req,res){
    console.log("Root route working");
    res.render('index');
});


app.post('/process', function(req, res){
    var info = req.body;
    res.render('results', {results: info});
})


app.listen(8000, function() {
    console.log("listening on port 8000");
})
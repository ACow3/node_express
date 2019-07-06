var express = require("express");
var path = require("path");
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var axios = require('axios');
const server = app.listen(8000);
const io = require('socket.io')(server);
var counter = 0;

app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



app.get('/', function(req, res) {
    if (!req.session.counter){
        req.session.counter = 1;
    }
    else {
        req.session.counter +=1;
    }
 res.render("index");
});



app.post('/process', function(req, res){
 console.log("POST DATA", req.body);
 
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comments = req.body.comments;

 res.render('index', {'name': req.session.name, 'location': req.session.location, 'language': req.session.language, 'comments': req.session.comments});
});


io.sockets.on('connection', function(socket) {
    socket.on("posting_form", function (results) {
        socket.emit("updated_message", {
            response: results
        });
    })

})
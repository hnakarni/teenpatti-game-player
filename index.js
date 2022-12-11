require('dotenv').config();
const bodyParser = require("body-parser");
const express = require('express');

const mongoose = require('mongoose');

const session = require('express-session');

const passport = require('passport');

const PUBLISHABLE_KEY = "pk_test_CjbynvLspYOTCXoPr6QYbrv4";

const passportLocal = require('./config/passport-local-strategy');

const passportJwt = require('./config/passport-jwt-strategy');

mongoose.connect("mongodb+srv://piyushTeenPatti:TeenPattipiyush@cluster0.qmui4jq.mongodb.net/TeenPatti",{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log("db is connected");
});

mongoose.connection.once('open', function(){
    console.log('Conection has been made!');
}).on('error', function(error){
    console.log('Error is: ', error);
});

const port = process.env.PORT || 8003;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(session({
    name : "SudokuG",
    secret : "SudokuG",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 *100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log("server is not running");
        return false;
    }
    console.log("server is running on port:",port);
});


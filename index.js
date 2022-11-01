require("dotenv").config();
const bodyParser = require("body-parser");
const express = require('express');


const mongoose = require('mongoose');

console.log(process.env.DATABASE);
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log("db is connected");
});


const port = process.env.port || 8002;

const app = express();

// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log("server is not running");
        return false;
    }
    console.log("server is running on port:8002");
});


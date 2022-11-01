const express = require('express');

const port = process.env.port || 8002;

const app = express();

const db = require('./config/mongoose');

app.use(express.urlencoded());

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log("server is not running");
        return false;
    }
    console.log("server is running on port:8002");
});


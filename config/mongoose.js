const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/sudokuGame");

const db = mongoose.connection;

db.on("error",console.error.bind(console,"something wrong"));

db.once('open', function(err){
    if(err){
        console.log("db not connected");
        return false;
    }
    console.log("db is connected");
});

module.exports = db;
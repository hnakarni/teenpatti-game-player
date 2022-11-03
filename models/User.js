const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : "String",
        required : true
    },
    email :{
        type : "String",
        required : true
    },
    password : {
        type : "String",
        required : true
    },
    isLogin : {
        type : "Boolean"
    },
    isLogintoken:{
        type : "String"
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;
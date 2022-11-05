const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'SudokuG'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id, function(err,user){
        console.log(user);
        if(err){
            console.log("error in finding user in JWT");
            return;
        }
        if(user){
            console.log(user);
            return done(null,user);
        }
        else{
            console.log("user not found");
            return done(null,false);
        }
    });
}))

module.exports = passport;
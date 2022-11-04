const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'SudokuG'
}
 console.log("jwt page");
passport.use(new JWTStrategy(opts, function(jwtPayLoad,done){
    console.log(jwtPayLoad);
    User.findById(jwtPayLoad._id, function(err,user){
        if(err){
            console.log("error in finding user in JWT");
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}))

module.exports = passport;
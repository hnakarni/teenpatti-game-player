const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField : 'email'
}, function(email,password,done){    
       User.findOne({email : email}, function(err,userData){
        if(err){
            console.log("Error in finding user - using passport");
            return done(err);
        }
        console.log(userData);
        if(!userData || userData.password != password ){
            console.log("Invalid username and password");
            return done(null,false);
        }
        return done(null,userData);
       })
}))

passport.serializeUser(function(user,done){
    return done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding in user ---> Passport");
            return done(err);
        }
        return done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/failurejson');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;
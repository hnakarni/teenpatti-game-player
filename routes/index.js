const express = require('express');

const  routes = express.Router();

const passport = require('passport');

const userController = require('../controllers/userController');

routes.post('/register', userController.userRegister);

routes.get('/viewRecord',passport.authenticate('jwt',{failureRedirect : '/failuerUserLogin'}),userController.viewRecord);

routes.post('/userLogin',userController.createSession);

routes.get('/failuerUserLogin', userController.failureJson);

routes.get('/logoutUser',passport.authenticate('jwt',{failureRedirect : "/"}),userController.logoutUser);

routes.get('/failureLogout', userController.failureLogout);

routes.get('/logoutSuccess', userController.logoutSuccess);
module.exports = routes;
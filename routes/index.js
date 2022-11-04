const express = require('express');

const  routes = express.Router();

const passport = require('passport');

const userController = require('../controllers/userController');

routes.post('/register', userController.userRegister);

routes.get('/viewRecord', userController.viewRecord);

routes.post('/userLogin',userController.createSession);

routes.get('/failuerUserLogin', userController.failureJson);

routes.get('/logoutUser', passport.authenticate('jwt',{successRedirect : '/logoutSuccess'}),userController.logoutUser);

routes.get('/logoutSuccess', userController.logoutSuccess);
module.exports = routes;
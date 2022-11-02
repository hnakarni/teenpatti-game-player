const express = require('express');

const  routes = express.Router();

const passport = require('passport');

const userController = require('../controllers/userController');

routes.post('/register', userController.userRegister);

routes.get('/viewRecord', userController.viewRecord);

routes.post('/userLogin', passport.authenticate('local',{failureRedirect : '/failuerUserLogin'}),userController.userLogin);

routes.get('/failuerUserLogin', userController.failureJson);
module.exports = routes;
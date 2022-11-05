const express = require('express');

const  routes = express.Router();

const passport = require('passport');

const userController = require('../controllers/userController');

routes.post('/register', userController.userRegister);

routes.get('/viewRecord',passport.authenticate('jwt',{session : false}),userController.viewRecord);

routes.post('/userLogin',userController.createSession);

routes.get('/failuerUserLogin', userController.failureJson);

routes.get('/logoutUser/:id',userController.logoutUser);

routes.get('/logoutSuccess', userController.logoutSuccess);
module.exports = routes;
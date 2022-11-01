const express = require('express');

const  routes = express.Router();

const userController = require('../controllers/userController');

routes.post('/register', userController.userRegister);

routes.get('/viewRecord', userController.viewRecord);

module.exports = routes;
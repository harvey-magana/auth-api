const express = require('express');
const Users = require('../models/usersModel');
const authController = require('../controllers/authController')
const router = express.Router();

/*****************************/
/******** USER SIGNUP ********/
/*****************************/

router.post('/register', authController.register);

/****************************/
/******** USER LOGIN ********/
/****************************/

router.post('/login', authController.login);

/*******************************/
/********* CHECK TOKEN *********/
/*******************************/

//router.get('/check_token', async (req, res, next) => {});

/*******************************/
/******** REFRESH TOKEN ********/
/*******************************/

//router.post('/refresh_token', async (req, res, next) => {});

/*****************************/
/******** USER LOGOUT ********/
/*****************************/

router.delete('/logout', authController.logout);

module.exports = router;
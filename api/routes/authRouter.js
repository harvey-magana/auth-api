const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const isLoggedIn = require('../middleware/isLoggedIn')

const router = express.Router();

/*****************************/
/******** USER SIGNUP ********/
/*****************************/

router.post('/register', validate.registrationValidation, authController.register);

/****************************/
/******** USER LOGIN ********/
/****************************/

router.post('/login', validate.loginValidation, authController.login);

/*******************************/
/********* CHECK TOKEN *********/
/*******************************/

router.get('/check_token', authController.checkToken);

/*******************************/
/******** REFRESH TOKEN ********/
/*******************************/

router.post('/refresh_token', authController.refresh);

/*****************************/
/******** USER LOGOUT ********/
/*****************************/

router.delete('/logout', isLoggedIn.isLoggedOut, authController.logout);

module.exports = router;
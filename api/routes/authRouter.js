const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');

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
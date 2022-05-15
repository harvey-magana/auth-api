const express = require('express');
const Users = require('../models/usersModel');
const router = express.Router();

/*****************************/
/******** USER SIGNUP ********/
/*****************************/

router.post('/register', async (req, res, next) => {
	try {
		const { username, email, password, confirm_password, role } = req.body;

		const user = await Users.findOne({ username: username }).first();
  
		if(user) {
			return res.status(400).json({
				message: 'Username taken...'
			});
		}
  
		const newUser = await Users.add({
			username,
			email, 
			password,
			confirm_password,
			role: role || 'reader'
		});
  
		res.status(201).json(newUser);
	} catch (error) {
		next(error.message);
	}
});

/****************************/
/******** USER LOGIN ********/
/****************************/

router.post('/login', async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await Users.findOne({ username: username });

		if(!user) {
			return res.status(404).json({
				message: 'User not found.'
			});
		}

		let sessionData = req.session;
		let userObj = {};
		if(!req.session.isLoggedIn) {
			req.session.isLoggedIn = true;
			req.session.user = user;
			req.session.verified = null;
			userObj = sessionData;
		}

		const response = {
			id: user.id,
			username: user.username,
			role: user.role
		};

		res.status(201).json(response);

	} catch (error) {
		next(error.message);
	}
});

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

router.delete('/logout', async (req, res, next) => {
	let sessionData = req.session;
	try {
		if(req.session) {
			req.session.isLoggedIn = false;
			req.session.user = null;

			sessionData.destroy(err => {
				if (err) {
					res.status(400).json({
						message: 'Unable to log out.'
					});
				}
				res.status(200).send('Logout successful');
			});
		} else {
			res.end();
		}
	} catch (error) {
		next(error.message);
	}
});

module.exports = router;
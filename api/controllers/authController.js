const Users = require('../models/usersModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { generateAccessToken, generateRefreshToken } = require('../utils/signTokens');

const tokenList = {};

exports.register = async (req, res, next) => {
	try {
		const { username, email, password, confirm_password, role } = req.body;

		const user = await Users.findOne({ username: username }).first();
  
		if(user) {
			return res.status(400).json({
				message: 'Username taken...'
			});
		}
  
		const salt = await bcryptjs.genSalt(10);
		const hashpassword = await bcryptjs.hash(password, salt);

		const newUser = await Users.add({
			username,
			email, 
			password: hashpassword,
			confirm_password,
			role: role || 'reader'
		});
  
		res.status(201).json(newUser);
	} catch (error) {
		next(error.message);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await Users.findOne({ username: username });
		
		if(!user) {
			return res.status(404).json({
				message: 'User not found.'
			});
		}
		
		if (user && bcryptjs.compareSync(password, user[0].password)) {
			let sessionData = req.session;
			let userObj = {};
			if(!req.session.isLoggedIn) {
				req.session.isLoggedIn = true;
				req.session.user = user;
				req.session.verified = null;
				userObj = sessionData;
			}

			const accessToken = generateAccessToken(user[0]);
			const refreshToken = generateRefreshToken(user[0]);

			const response = {
				id: user[0].id,
				loggedIn: req.session.isLoggedIn,
				username: user[0].username,
				role: user[0].role,
				token: accessToken,
				refreshToken: refreshToken
		}

		tokenList[refreshToken] = response

		res.status(201).json(response);

		} else {
			res.status(401).json({
				message: 'Invalid password.'
			});
		}

	} catch (error) {
		next(error.message);
	}
};

exports.refresh = async (req, res, next) => {};

exports.checkToken = async (req, res, next) => {};

exports.logout = async (req, res, next) => {
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
};
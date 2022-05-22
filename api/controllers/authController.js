require('dotenv').config();
const Users = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const bcryptjs = require('bcryptjs');
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
  
		res.status(201).json({ data: newUser });
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
			if(!req.session.isLoggedIn) {
				req.session.isLoggedIn = true;
				req.session.user = user;
				req.session.verified = null;
			}
			req.session = sessionData;

			const accessToken = generateAccessToken(user[0]);
			const refreshToken = generateRefreshToken(user[0]);

			const response = {
				id: user[0].id,
				loggedIn: sessionData.isLoggedIn,
				username: user[0].username,
				role: user[0].role,
				token: accessToken,
				refreshToken: refreshToken
			};

			tokenList[refreshToken] = response;
			
			res.status(201).json({ data: response });

		} else {
			res.status(401).json({
				message: 'Invalid password.'
			});
		}

	} catch (error) {
		next(error.message);
	}
};

exports.refresh = async (req, res, next) => {
	try {
		const postData = req.body;

		if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
			const user = {
				username: postData.username,
				email: postData.email
			}

			const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
			const response = {
				token: token
			}

			tokenList[postData.refreshToken].token = token 
			res.status(201).json(response);
		}

		next();
	} catch (error) {
		res.status(500).json(error.message);
	}
};

exports.checkToken = async (req, res, next) => {
	const token = req.headers['authorization'].split(' ')[1];
	try {
		if (token) {
			const decoded = await jwt_decode(token);

			if(decoded.exp < Date.now) {
				res.status(200).json({
					token_expiration: decoded.exp, 
					token_issue: decoded.iat
				});
				next();
			} else {
				res.status(200).json({
					message: 'Token still valid'
				});
			}
		}
	} catch (error) {
		return next();
	}
};

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
const Users = require('../models/usersModel');


exports.register = async (req, res, next) => {
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
}

exports.login = async (req, res, next) => {
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

		res.status(201).json(user);


	} catch (error) {
		next(error.message);
	}
}

exports.refresh = async (req, res, next) => {}

exports.checkToken = async (req, res, next) => {}

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
}
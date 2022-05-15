const express = require('express');
const Users = require('../models/usersModel');
const router = express.Router();

/************************/
/********* READ *********/
/************************/

router.get('/', async (req, res, next) => {
	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (error) {
		next(error.message);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const [user] = await Users.findById(id);
		res.status(200).json(user);
	} catch (error) {
		next(error.message);
	}
});

/************************/
/******** UPDATE ********/
/************************/

router.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const userBody = req.body;
		const user = await Users.update(id, userBody);

		if(user) {
			res.status(201).json({
				message: `${user.username} has been updated`,
				id: id,
				user: userBody
			});
		} else {
			res.status(500).json({
				message: 'Fail...'
			});
		}
	} catch (error) {
		next(error.message);
	}
});

/************************/
/******** DELETE ********/
/************************/

router.delete('/:id', async (req, res, next) => {
	try {
		const userId = req.params.id;
		const user = await Users.remove(userId);

		if (user) {
			res.status(200).json({
				message: 'The user has been deleted...',
				userId: userId
			});
		} else {
			res.status(500).json({
				message: 'Sorry, there was a problem with that last commend...'
			});
		}

	} catch (error) {
		next(error.message);
	}
});

/************************/
/***** IMAGE UPLOAD *****/
/************************/

//router.put('/:id/upload', async (req, res, next) => {});

/******************************/
/***** GET UPLOADED IMAGE *****/
/******************************/

//router.get('/:id/upload', async (req, res, next) => {});

/*************************/
/***** DELETE IMAGE ******/
/*************************/

//router.patch('/:id/upload/', async (req, res, next) => {});

module.exports = router;
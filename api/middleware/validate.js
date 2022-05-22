const { check, body, validationResult } = require('express-validator');

exports.registrationValidation = async (req, res, next) => {
	await check('username', 'username of at least 3 characters required.')
		.isLength({ min: 3 }).trim().escape().run(req);
	await check('email').isEmail().withMessage({ message: 'Not an email' }).run(req);
	await check('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long').matches(/\d/).withMessage('must contain a number').run(req);
	await body('confirm_password').custom((value, { req }) => {
		if(value !== req.body.password) {
			throw new Error('Password confirmation does not match password');
		}

		return true;
	}).run(req);

	const errorFormatter = ({ msg, param }) => {
		return param + ':' + JSON.stringify(msg);
	}

	const result = validationResult(req).formatWith(errorFormatter);

	if (!result.isEmpty()) {
		return res.status(400).json({
			error: result.mapped()
		});
	}
	next();
};

exports.loginValidation = async (req, res, next) => {
	await check('username', 'username of at least 3 characters required.')
		.isLength({ min: 3 }).trim().escape().run(req);
	await check('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long').matches(/\d/).withMessage('must contain a number').run(req);

	const errorFormatter = ({ msg, param }) => {
		return param + ':' + JSON.stringify(msg);
	}

	const result = validationResult(req).formatWith(errorFormatter);

	if (!result.isEmpty()) {
		return res.status(400).json({
			error: result.mapped()
		});
	}
	next();
};

exports.postValidation = async (req, res, next) => {
	await check('post_title', 'post_title must be at least 1 char in length.')
		.isLength({ min: 1 }).trim().escape().run(req);
	await check('post_title', 'post_title must be no more than 50 char in length.')
		.isLength({ max: 50 }).trim().escape().run(req);
	await check('post_body').isLength({ max: 255 }).withMessage('Post body must ot be more than 255 char in length.').run(req);

	const errorFormatter = ({ msg, param }) => {
		return param + ':' + JSON.stringify(msg);
	}

	const result = validationResult(req).formatWith(errorFormatter);

	if (!result.isEmpty()) {
		return res.status(400).json({
			error: result.mapped()
		});
	}
	next();
};

exports.commentValidation = async (req, res, next) => {
	await check('body').isLength({ max: 255 }).withMessage('Comment body must not be more than 255 char in length.').run(req);

	const errorFormatter = ({ msg, param }) => {
		return param + ':' + JSON.stringify(msg);
	}

	const result = validationResult(req).formatWith(errorFormatter);

	if (!result.isEmpty()) {
		return res.status(400).json({
			error: result.mapped()
		});
	}
	next();
};
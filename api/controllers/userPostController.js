const userPost = require('../models/userPostModel');
const { roles } = require('../utils/roles');

exports.getUserPostById = async (req, res, next) => {
	try {
		const { id } = req.params; // user id 
		const data = req.user;

		const permission = (data.id === id && roles.can(data.role).readOwn('post').granted) ? roles.can(data.role).readOwn('post') : roles.can(data.role).readAny('post');

		if(permission.granted) {
			const user = await userPost.findPostByUserId(id);
			return res.status(200).json(user);
		}

	} catch (error) {
		next(error.message);
	}
};
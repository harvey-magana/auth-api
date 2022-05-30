const userPost = require('../models/userPostModel');

exports.getUserPostById = async (req, res, next) => {
	try {
		const { id } = req.params; // user id 
		const user = await userPost.findPostByUserId(id);
		res.status(200).json(user);
	} catch (error) {
		next(error.message);
	}
};
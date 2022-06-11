const postComment = require('../models/postCommentModel');

exports.getPostComments = async (req, res, next) => {
	try {
		const { id } = req.params; // id is user_id
		const postCom = await postComment.findPostComments(id);
		res.status(200).json(postCom);
	} catch (error) {
		next(error.message);
	}
};

const postComment = require('../models/postCommentModel');
const { roles } = require('../utils/roles');

exports.getPostComments = async (req, res, next) => {
	try {
		const { id } = req.params; // id is user_id
		const data = req.user;

		const permission = (data.id === id && roles.can(data.role).readOwn('comment').granted) ? roles.can(data.role).readOwn('comment') : roles.can(data.role).readAny('comment');

		if(permission.granted) {
			const postCom = await postComment.findPostComments(id);
			return res.status(200).json(postCom);
		}

	} catch (error) {
		next(error.message);
	}
};

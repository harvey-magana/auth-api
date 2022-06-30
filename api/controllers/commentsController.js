const Comments = require('../models/commentsModel');
const { roles } = require('../utils/roles');

exports.getAllComments = async (req, res, next) => {
	try {
		const comments = await Comments.find();
		res.status(200).json(comments);
	} catch (error) {
		next(error.message);
	}
};

exports.getCommentById = async (req, res, next) => {
	try {
		const { id } = req.params; // comment id
		const data = req.user;

		const permission = (data.id === id && roles.can(data.role).readOwn('comment').granted) ? roles.can(data.role).readOwn('comment') : roles.can(data.role).readAny('comment');

		if(permission.granted) {
			const comment = await Comments.findById(id);
			return res.status(200).json(comment);
		}
	} catch (error) {
		next(error.message);
	}
};

exports.createComment = async (req, res, next) => {
	try {
		// postComment cannot be more than 255 char 
		const authorId = req.params.id; // validation that checks whether the user id exists is missing! 
		const data = req.user;
		const postComment = req.body.body;
		const postId = req.body.post_id;

		const permission = (data.id === authorId && roles.can(data.role).createOwn('comment').granted) ? roles.can(data.role).createOwn('comment') : roles.can(data.role).createAny('comment');

		if(permission.granted) {
			const comt = await Comments.add({user_id: authorId, post_id: postId, body: postComment });
			return res.status(201).json(comt);
		}

	} catch (error) {
		next(error.message);
	}
};

exports.updateComment = async (req, res, next) => {
	try {
		// postComment cannot be more than 255 char 
		const { id } = req.params; // comment id
		const data = req.user;
		const body = req.body;

		const permission = (data.id === body.user_id && roles.can(data.role).updateOwn('comment').granted) ? roles.can(data.role).updateOwn('comment') : roles.can(data.role).updateAny('comment');

		if(permission.granted) {
			const comment = await Comments.update(id, body);
			return res.status(201).json({
				message: 'Comment to post updated.',
				comment
			})
		}
;
	} catch (error) {
		next(error.message);
	}
};

exports.deleteComment = async (req, res, next) => {
	try {
		const { id } = req.params; // comment id 
		const data = req.user;
		const body = req.body;

		const permission = (data.id === body.user_id && roles.can(data.role).deleteOwn('comment').granted) ? roles.can(data.role).deleteOwn('comment') : roles.can(data.role).deleteAny('comment');

		if(permission.granted) {
			const comment = await Comments.remove(id);

			if (comment) {
				res.status(200).json({
					message: 'Post comment deleted successfully...',
					post: id
				});
			} else {
				res.status(500).json({
					message: 'Failed to delete post...'
				});
			}
		}

	} catch (error) {
		next(error.message);
	}
};


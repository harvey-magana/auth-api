const Comments = require('../models/commentsModel');

exports.getAllComments = async (req, res, next) => {
	try {
		console.log('commentsController line 5', req.session)
		const comments = await Comments.find();
		res.status(200).json(comments);
	} catch (error) {
		next(error.message);
	}
};

exports.getCommentById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const comment = await Comments.findById(id);
		res.status(200).json(comment);
	} catch (error) {
		next(error.message);
	}
};

exports.getPostComments = async (req, res, next) => {
	try {
		const { id } = req.params; // id is user_id
		const comment = await Comments.findPostComments(id);
		res.status(200).json(comment);
	} catch (error) {
		next(error.message);
	}
};

exports.createComment = async (req, res, next) => {
	try {
		// postComment cannot be more than 255 char 
		const authorId = req.params.id; // validation that checks whether the user id exists is missing! 
		const postComment = req.body.body;
		const postId = req.body.post_id;

		const comt = await Comments.add({user_id: authorId, post_id: postId, body: postComment });
		res.status(201).json(comt);
	} catch (error) {
		next(error.message);
	}
};

exports.updateComment = async (req, res, next) => {
	try {
		// postComment cannot be more than 255 char 
		const { id } = req.params;
		const body = req.body;

		const comment = await Comments.update(id, body);
		res.status(201).json({
			message: 'Comment to post updated.',
			comment
		});
	} catch (error) {
		next(error.message);
	}
};

exports.deleteComment = async (req, res, next) => {
	try {
		const { id } = req.params;
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
	} catch (error) {
		next(error.message);
	}
};


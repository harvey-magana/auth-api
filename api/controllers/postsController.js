const Posts = require('../models/postsModel');

exports.getAllPosts = async (req, res, next) => {
	try {
		console.log('postsController line 5', req.session)
		const post = await Posts.find();
		res.status(200).json(post);
	} catch (error) {
		next(error.message);
	}
};

exports.getPostById = async (req, res, next) => {
	try {
		const { id } = req.params; // postId
		const post = await Posts.findById(id);
		res.status(200).json(post);
	} catch (error) {
		next(error.message);
	}
};

exports.getUserPostById = async (req, res, next) => {};

exports.createPost = async (req, res, next) => {
	try {
		const { id } = req.params; // userId // validation to check whether the user id exists or not is missing here! 
		const postTitle = req.body.post_title;
		const postBody = req.body.post_body;

		const post = await Posts.add({user_id: id, post_title: postTitle, post_body: postBody});

		res.status(201).json({
			message: `Post added by ${id}`,
			post: post
		});
	} catch (error) {
		next(error.message);
	}
};

exports.editPost = async (req, res, next) => {
	try {
		const { id } = req.params; // postId
		const body = req.body;

		const post = await Posts.update(id, body);

		if (post) {
			res.status(201).json({
				message: `Post ${id} has been updated`,
				post: body.post_title
			});
		} else {
			res.status(500).json({
				message: 'Sorry, no posts were retrieved...',
			});
		}

	} catch (error) {
		next(error.message);
	}
};

exports.deletePost = async (req, res, next) => {
	try {
		const { id } = req.params; // postId
		const post = await Posts.remove(id);

		if (post) {
			res.status(200).json({
				message: 'Post deleted successfully...',
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


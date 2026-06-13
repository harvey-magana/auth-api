const Posts = require('../models/postsModel');
const { roles } = require('../utils/roles');

exports.getAllPosts = async (req, res, next) => {
	try {
		const post = await Posts.find();
		res.status(200).json(post);
	} catch (error) {
		next(error.message);
	}
};

exports.getPostById = async (req, res, next) => {
	try {
		const { id } = req.params; // post id 
		const data = req.user;

		const permission = (data.id === id && roles.can(data.role).readOwn('post').granted) ? roles.can(data.role).readOwn('post') : roles.can(data.role).readAny('post');

		if(permission.granted) {
			const post = await Posts.findById(id);

			return res.status(200).json(post);
		}
		next();
	} catch (error) {
		next(error.message);
	}
};

exports.createPost = async (req, res, next) => {
	try {
		const { id } = req.params; // user id // validation to check whether the user id exists or not is missing here! 
		const data = req.user;
		const postTitle = req.body.post_title;
		const postBody = req.body.post_body;

		const permission = (data.id === id && roles.can(data.role).createOwn('post').granted) ? roles.can(data.role).createOwn('post') : roles.can(data.role).createAny('post');

		if(permission.granted) {
			const post = await Posts.add({user_id: id, post_title: postTitle, post_body: postBody});

			return res.status(201).json({
				message: `Post added by ${id}`,
				post: post
			});
		}
		next();
	} catch (error) {
		next(error.message);
	}
};

exports.editPost = async (req, res, next) => {
	try {
		const { id } = req.params; // post id 
		const data = req.user;
		const body = req.body;

		const permission = (data.id === body.user_id && roles.can(data.role).updateOwn('post').granted) ? roles.can(data.role).updateOwn('post') : roles.can(data.role).updateAny('post');

		if(permission.granted) {
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
		}
		next();
	} catch (error) {
		next(error.message);
	}
};

exports.deletePost = async (req, res, next) => {
	try {
		const { id } = req.params; // post id 
		const data = req.user;
		const body = req.body;

		const permission = (data.id === body.user_id && roles.can(data.role).deleteOwn('post').granted) ? roles.can(data.role).deleteOwn('post') : roles.can(data.role).deleteAny('post');

		if(permission.granted) {
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
		}

	} catch (error) {
		next(error.message);
	}
};


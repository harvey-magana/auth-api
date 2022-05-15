const express = require('express');
const Comments = require('../models/commentsModel');
const router = express.Router();

/*********************************/
/********* GET COMMENTS **********/
/*********************************/

router.get('/', async (req, res, next) => {
	try {
		const comments = await Comments.find();
		res.status(200).json(comments);
	} catch (error) {
		next(error.message);
	}
});

/********************************/
/********* GET COMMENTS *********/
/********************************/

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const comment = await Comments.findById(id);
		res.status(200).json(comment);
	} catch (error) {
		next(error.message);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params; // id is user_id
		const comment = await Comments.findPostComments(id);
		res.status(200).json(comment);
	} catch (error) {
		next(error.message);
	}
});

/*********************************/
/******** CREATE COMMENTS ********/
/*********************************/

router.post('/:id', async (req, res, next) => {
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
});

/*********************************/
/******** UPDATE COMMENTS ********/
/*********************************/

router.put('/:id', async (req, res, next) => {
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
});

/*********************************/
/******** DELETE COMMENTS ********/
/*********************************/

router.delete('/:id', async (req, res, next) => {
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
});

module.exports = router;
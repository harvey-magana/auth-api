const db = require('../db/dbConfig');

module.exports = {
	find,
	findOne,
	findById,
	findPostComments,
	findCommentById
};

function find() {
	return db('comments')
		.select('id', 'body', 'user_id', 'post_id').orderBy('id');
}

async function findOne(filter) {
	return db('comments').where(filter).orderBy('id');
}

async function findById(id) {
	const [comments] = await db('comments').where({ id });
	return comments;
}

async function findPostComments(postId) {
	const postComment = await db('posts as p')
		.join('comments as c', 'p.id', '=', 'c.post_id')
		.select('c.body', 'c.post_id', 'c.user_id', 'p.post_title', 'p.post_body')
		.where('c.user_id', '=', postId);
	return postComment;
}

async function findCommentById(id) {
	return await db('comments').join('posts', 'posts.id', 'post_id').select('comments.*', 'title as post')
		.where('commments.id', id);
}
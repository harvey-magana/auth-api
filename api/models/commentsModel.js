const db = require('../db/dbConfig');

module.exports = {
	find,
	findOne,
	findById,
	add,
	update,
	remove,
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

async function add(filter) {
	const [ids] = await db('comments').insert(filter).returning('*');
	return ids;
}

async function update(id, changes) {
	const comment = await db('comments').where({id}).update(changes);
	return comment;
}

async function remove(id) {
	return await db('comments').where({id}).del();
}

async function findPostComments(postId) {
	return await db('comments').join('posts', 'posts.id', 'post_id').select('comments.*', 'title as post')
		.where('post_id', postId);
}

async function findCommentById(id) {
	return await db('comments').join('posts', 'posts.id', 'post_id').select('comments.*', 'title as post')
		.where('commments.id', id);
}
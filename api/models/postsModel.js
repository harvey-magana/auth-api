const db = require('../db/dbConfig');

module.exports = {
	find,
	findOne,
	findById,
	add,
	update,
	remove
};

function find() {
	return db('posts')
		.select('id', 'post_title', 'post_body', 'user_id').orderBy('id');
}

async function findOne(filter) {
	return db('posts').where(filter).orderBy('id');
}

async function findById(id) {
	const [posts] = await db('posts').where({ id });
	return posts;
}

async function add(userData) {
	const [ids] = await db('posts').insert({
		post_title: userData['post_title'], 
		post_body: userData['post_body'], 
		user_id: userData['user_id'] }).returning('*');
	return ids;
}

async function update(id, changes) {
	const count = await db('posts').where({ id }).update(changes);
	return count;
}

async function remove(id) {
	return await db('posts').where({ id }).del();
}


const db = require('../db/dbConfig');

module.exports = {
	find,
	findById,
	findOne,
	add,
	update,
	remove,
	addImage,
	findUserImage,
	removeImage
};

async function find() {
	return await db('users').select('id', 'username', 'email', 'role').orderBy('id');
}

async function findById(id) {
	return await db('users').where({ id });
}

function findOne(filter) {
	return db('users').select('id', 'username', 'password', 'role').where(filter);
}

async function add(userData) {
	const [ids] = await db('users').insert({
		username: userData['username'], 
		email: userData['email'], 
		password: userData['password'], 
		confirm_password: userData['confirm_password'], 
		role: userData['role'], 
		image_path: userData['image_path'] }).returning('*');
	return ids;
}

async function update(id, changes) {
	const [updateUser] = await db('users').where({ id }).update(changes).returning('*');
	return updateUser;
}

async function remove(id) {
	const [deleteUser] = await db('users').where({ id }).del().returning('*');
	return deleteUser;
}

async function addImage(changes) {
	const [userImg] = await db('users').where({id: changes.id}).update({image_path: changes.image_path}).returning('*');
	return userImg;
}

async function findUserImage(id) {
	return await db('users')
		.select('id', 'image_path')
		.where({id});
}

async function removeImage(id) {
	const [removeImg] = await db('users').where(id).update({ image_path: null }).returning('*');
	return removeImg;
}

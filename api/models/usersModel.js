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

// recommended to use this function to avoid exposing sensitive data like password and image_path
const publicUserColumns = ['id', 'username', 'email', 'role'];

// new findById start
async function findById(id) {
  return await db('users')
    .select(...publicUserColumns, 'image_path')
    .where({ id });
}

function findOne(filter) {
	return db('users').select('id', 'username', 'password', 'role').where(filter);
}

async function add(userData) {
	const [ids] = await db('users').insert({
		username: userData['username'], 
		email: userData['email'], 
		password: userData['password'], 
		role: userData['role'], 
		image_path: userData['image_path'] }).returning(publicUserColumns);
	return ids;
}

async function update(id, changes) {
	const [updateUser] = await db('users').where({ id }).update(changes).returning(publicUserColumns);
	return updateUser;
}

async function remove(id) {
	const [deleteUser] = await db('users').where({ id }).del().returning(publicUserColumns);
	return deleteUser;
}

async function addImage(changes) {
	const [userImg] = await db('users').where({id: changes.id}).update({image_path: changes.image_path}).returning(publicUserColumns);
	return userImg;
}

async function findUserImage(id) {
	return await db('users')
		.select('id', 'image_path')
		.where({id});
}

async function removeImage(id) {
	const [removeImg] = await db('users').where(id).update({ image_path: null }).returning(publicUserColumns);
	return removeImg;
}

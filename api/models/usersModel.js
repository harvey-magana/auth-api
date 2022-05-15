const db = require('../db/dbConfig');

module.exports = {
  find,
  findById,
  findOne,
  add
}

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
    const [ids] = await db('users').insert(userData);
    return newUser = await (findById(ids));
}
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

async function add(filter) {
	const [ids] = await db('posts').insert(filter);
	return await (findById(ids));
}

async function update(id, changes) {
	const count = await db('posts').where({ id }).update(changes);
	return count;
}

async function remove(id) {
	return await db('posts').where({ id }).del();
}

/*
async function findPostByUserId(id) {
	console.log('postsModel line 42', id)
  const [ids] = await db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('u.id', 'u.image_path', 'u.role', 'p.id', 'p.post_title', 'p.post_body').limit(1)
    .where( 'p.user_id', id );
  return await (findById(ids));
}
*/

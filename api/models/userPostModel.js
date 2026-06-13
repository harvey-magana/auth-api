const db = require('../db/dbConfig');

module.exports = {
	findPostByUserId
};

async function findPostByUserId(id) {
	const userPost = await db('users as u')
		.join('posts as p', 'u.id', '=', 'p.user_id')
		.join('comments as c', 'u.id', '=', 'c.user_id')
		.select('u.id', 'u.image_path', 'u.role', 'p.id', 'p.post_title', 'p.post_body', 'c.user_id', 'c.post_id', 'c.body').limit(10)
		.where( 'u.id', '=', id );
	return userPost;
}

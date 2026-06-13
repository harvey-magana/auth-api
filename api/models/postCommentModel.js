const db = require('../db/dbConfig');

module.exports = {
	findPostComments
};

async function findPostComments(postId) {
	const postComment = await db('posts as p')
		.join('comments as c', 'p.id', '=', 'c.post_id')
		.select('c.body', 'c.post_id', 'c.user_id', 'p.post_title', 'p.post_body')
		.where('c.user_id', '=', postId);
	return postComment;
}

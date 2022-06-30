const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function() {
	ac.grant('reader')
		.createAny('post').readAny('post').updateOwn('post').deleteOwn('post')
		.createAny('comment').readAny('comment').updateOwn('comment').deleteOwn('comment')
		.readOwn('profile', ['*']).updateOwn('profile').deleteAny('profile')
		.readAny('avatar').updateAny('avatar').deleteAny('avatar');

	ac.grant('moderator')
		.extend('reader')
		.createAny('post').readAny('post')
		.createAny('comment').readAny('comment')
		.readAny('profile')
		.readAny('avatar');
  
	ac.grant('editor')
		.extend('reader')
		.extend('moderator')
		.updateAny('post').deleteAny('post')
		.updateAny('comment').deleteAny('comment')
		.updateAny('profile').deleteAny('profile')
		.updateAny('avatar').deleteAny('avatar');
	return ac;
})();
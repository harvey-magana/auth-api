const { roles } = require('../utils/roles');

exports.grantAccess = function(action, resource) {
	return async (req, res, next) => {
		try {
			const data = req.user;
      
			let modAction = action;

			// the statement below works with requests that use a param, such as in POST, PUT and DELETE REQUESTS 
			// as long as the user_id is included in the request body, 
			// without it, the permissions would be overwritten by the wrong user
			// PUT and DELETE requests must include user_id in the request body in order for the request to return 200
			// the problem with this is if user_id is included in any request body where the param should be the id of the resource 
			// rather than the user id, it will also return 200 when it should not 
			// logic needs to be set up, such that for requests where the param is the user id, the access is given 
			// when it is correct, requests that do not take the user id as the param should complain if it is given 
			// users: GET, PUT and DELETE, param is user id 
			// posts: GET, PUT and DELETE, param is post id, POST param is user id 
			// comments: GET, PUT and DELETE, param is comment id, POST param is user id 
			if(data.id === req.body.user_id) {
				modAction = action.replace('Any', 'Own');
			}
			console.log('accessController line 16', req.user.id)
			console.log('accessController line 17', req.user.role)
			console.log('accessController line 18', modAction)
			console.log('accessController line 19', req.params.id)
			const permission = roles.can(data.role)[modAction](resource);

			if(!permission.granted) {
				return res.status(401).json({
					error: 'You do not have the necessary permission to perform this action.'
				});
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};

exports.allowIfLoggedin = async (req, res, next) => {
	try {
		const user = await req.session.verified;
		
		if(!user) 
			return res.status(401).json({
				error: 'You need to be logged in to access this route.'
			});
		req.user = user;
		
		next();
	} catch (error) {
		next(error.message);
	}
};
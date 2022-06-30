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
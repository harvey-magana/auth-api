const isLoggedIn = async (req, res, next) => {
	if(await req.session.isLoggedIn && req.headers['authorization'] !=null) {
		res.status(400).json({
			message: 'But you are already logged in!'
		});
	} else {
		res.status(400).json({
			message: 'You are not logged in.'
		});
	}
	next();
};

const isLoggedOut = async (req, res, next) => {
	if(await req.session.isLoggedIn) {
		req.headers['authorization'] = null;
		req.session.user = null;
		req.session.isLoggedIn = false;
		req.sessionID = null;
	}
	req.session.destroy();
	res.status(200).clearCookie('connect.sid');
	res.json({
		message: 'You are logged out.'
	});
	next();
};

module.exports = {
	isLoggedIn, isLoggedOut
};
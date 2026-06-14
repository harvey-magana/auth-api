require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];

		if(authHeader) {
			const token = authHeader.split(' ')[1];

			if(token == null) return res.status(401).json({ message: 'invalid token' });

			let decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
			req.session.verified = decoded;
			req.user = decoded;
			next();
		}

	} catch (error) {
		next(error.message);
	}
};

module.exports = verifyToken;
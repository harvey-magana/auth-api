require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key.pub'), 'utf8');

function generateAccessToken(user) {
	return jwt.sign(user, privateKey, { expiresIn: '5h', algorithm: 'RS256' });
}

function generateRefreshToken(user) {
	return jwt.sign(user, privateKey, { expiresIn: '1d', algorithm: 'RS256' });
}

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

module.exports = {
	generateAccessToken, 
	generateRefreshToken,
	verifyToken
};
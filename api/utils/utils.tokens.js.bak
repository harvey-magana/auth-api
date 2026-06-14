require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key.pub'), 'utf8');

function generateAccessToken(user) {
	const payload = { id: user.id, username: user.username, role: user.role };
	return jwt.sign(payload, privateKey, { expiresIn: '5h', algorithm: 'RS256' });
}

function generateRefreshToken(user) {
	const payload = { id: user.id, username: user.username, role: user.role };
	return jwt.sign(payload, privateKey, { expiresIn: '1d', algorithm: 'RS256' });
}

// updated code start 
const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({ message: 'Authorization header required' });
		}

		const [scheme, token] = authHeader.split(' ');

		if (scheme !== 'Bearer' || !token || token === 'undefined' || token === 'null') {
			return res.status(401).json({ message: 'Valid Bearer token required' });
		}

		const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

		if (req.session) {
			req.session.verified = decoded;
		}

		req.user = decoded;

		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};
// updated code end 

module.exports = {
	generateAccessToken, 
	generateRefreshToken,
	verifyToken
};
require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
}

function generateRefreshToken(user) {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}

module.exports = {
	generateAccessToken, 
	generateRefreshToken
};
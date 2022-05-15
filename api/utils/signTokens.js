require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
}

module.exports.generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
}
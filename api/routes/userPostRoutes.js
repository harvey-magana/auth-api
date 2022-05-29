const express = require('express');
const userPostController = require('../controllers/userPostController');
const checkToken = require('../utils/utils.tokens');
const router = express.Router();

router.get('/:id', checkToken.verifyToken, userPostController.getUserPostById);

module.exports = router;
const express = require('express');
const userPostController = require('../controllers/userPostController');
const checkToken = require('../utils/utils.tokens');
const accessController = require('../controllers/accessController');


const router = express.Router();

router.get('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, userPostController.getUserPostById);

module.exports = router;
const express = require('express');
const postCommentController = require('../controllers/postCommentController');
const checkToken = require('../utils/utils.tokens');
const accessController = require('../controllers/accessController');

const router = express.Router();

router.get('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, postCommentController.getPostComments);

module.exports = router;
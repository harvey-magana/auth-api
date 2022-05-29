const express = require('express');
const postCommentController = require('../controllers/postCommentController');
const checkToken = require('../utils/utils.tokens');
const router = express.Router();

router.get('/:id', checkToken.verifyToken, postCommentController.getPostComments);

module.exports = router;
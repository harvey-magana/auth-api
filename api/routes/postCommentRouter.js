const express = require('express');
const postCommentController = require('../controllers/postCommentController');
const router = express.Router();

router.get('/:id', postCommentController.getPostComments);

module.exports = router;
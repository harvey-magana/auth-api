const express = require('express');
const postCommentController = require('../controllers/postCommentController');
//const signTokens = require('../utils/signTokens'); // add signTokens.verifyToken to the route 
const router = express.Router();

router.get('/:id', postCommentController.getPostComments);

module.exports = router;
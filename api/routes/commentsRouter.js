const express = require('express');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

/*********************************/
/********* GET COMMENTS **********/
/*********************************/

router.get('/', commentsController.getAllComments);

/********************************/
/********* GET COMMENTS *********/
/********************************/

router.get('/:id', commentsController.getCommentById);

router.get('/:id', commentsController.getPostComments);

/*********************************/
/******** CREATE COMMENTS ********/
/*********************************/

router.post('/:id', commentsController.createComment);

/*********************************/
/******** UPDATE COMMENTS ********/
/*********************************/

router.put('/:id', commentsController.updateComment);

/*********************************/
/******** DELETE COMMENTS ********/
/*********************************/

router.delete('/:id', commentsController.deleteComment);

module.exports = router;
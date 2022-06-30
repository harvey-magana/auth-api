const express = require('express');
const commentsController = require('../controllers/commentsController');
const validate = require('../middleware/validate');
const accessController = require('../controllers/accessController');
const checkToken = require('../utils/utils.tokens');

const router = express.Router();

/*********************************/
/********* GET COMMENTS **********/
/*********************************/

router.get('/', checkToken.verifyToken, accessController.allowIfLoggedin, commentsController.getAllComments);

/********************************/
/********* GET COMMENTS *********/
/********************************/

router.get('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, commentsController.getCommentById);

/*********************************/
/******** CREATE COMMENTS ********/
/*********************************/

router.post('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, validate.commentValidation, commentsController.createComment);

/*********************************/
/******** UPDATE COMMENTS ********/
/*********************************/

router.put('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, commentsController.updateComment);

/*********************************/
/******** DELETE COMMENTS ********/
/*********************************/

router.delete('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, commentsController.deleteComment);

module.exports = router;
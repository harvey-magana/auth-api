const express = require('express');
const commentsController = require('../controllers/commentsController');
const validate = require('../middleware/validate');
const accessController = require('../controllers/accessController');
const checkToken = require('../utils/utils.tokens');

const router = express.Router();

/*********************************/
/********* GET COMMENTS **********/
/*********************************/

router.get('/', checkToken.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'comment'), commentsController.getAllComments);

/********************************/
/********* GET COMMENTS *********/
/********************************/

router.get('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'comment'), commentsController.getCommentById);

router.get('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'comment'), commentsController.getPostComments);

/*********************************/
/******** CREATE COMMENTS ********/
/*********************************/

router.post('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('createAny', 'comment'), validate.commentValidation, commentsController.createComment);

/*********************************/
/******** UPDATE COMMENTS ********/
/*********************************/

router.put('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('updateAny', 'comment'), commentsController.updateComment);

/*********************************/
/******** DELETE COMMENTS ********/
/*********************************/

router.delete('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('deleteAny', 'comment'), commentsController.deleteComment);

module.exports = router;
const express = require('express');
const commentsController = require('../controllers/commentsController');
const validate = require('../middleware/validate');
const accessController = require('../controllers/accessController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

/*********************************/
/********* GET COMMENTS **********/
/*********************************/

router.get('/', verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'comment'), commentsController.getAllComments);

/********************************/
/********* GET COMMENTS *********/
/********************************/

router.get('/:id', verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'comment'), commentsController.getCommentById);

router.get('/:id', verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'comment'), commentsController.getPostComments);

/*********************************/
/******** CREATE COMMENTS ********/
/*********************************/

router.post('/:id', verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('createAny', 'comment'), validate.commentValidation, commentsController.createComment);

/*********************************/
/******** UPDATE COMMENTS ********/
/*********************************/

router.put('/:id', verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('updateAny', 'comment'), commentsController.updateComment);

/*********************************/
/******** DELETE COMMENTS ********/
/*********************************/

router.delete('/:id', verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('deleteAny', 'comment'), commentsController.deleteComment);

module.exports = router;
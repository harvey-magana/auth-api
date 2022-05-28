const express = require('express');
const postsController = require('../controllers/postsController');
const accessController = require('../controllers/accessController');
const signTokens = require('../utils/signTokens');
const validate = require('../middleware/validate');

const router = express.Router();

/******************************/
/********* GET POSTS **********/
/******************************/

router.get('/', signTokens.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'post'), postsController.getAllPosts);

/*****************************/
/********* GET POST *********/
/*****************************/

router.get('/:id', signTokens.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'post'), postsController.getPostById);

/*****************************/
/******** CREATE POST ********/
/*****************************/

router.post('/:id', signTokens.verifyToken, validate.postValidation, accessController.allowIfLoggedin, accessController.grantAccess('createAny', 'post'), validate.postValidation, postsController.createPost);

/****************************/
/******** UPDATE POST********/
/****************************/

router.put('/:id', signTokens.verifyToken, validate.postValidation, accessController.allowIfLoggedin, accessController.grantAccess('updateAny', 'post'), postsController.editPost);

/*****************************/
/******** DELETE POST ********/
/*****************************/

router.delete('/:id', signTokens.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('deleteAny', 'post'), postsController.deletePost);

module.exports = router;
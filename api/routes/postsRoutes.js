const express = require('express');
const postsController = require('../controllers/postsController');
const accessController = require('../controllers/accessController');
const checkToken = require('../utils/utils.tokens');
const validate = require('../middleware/validate');

const router = express.Router();

/******************************/
/********* GET POSTS **********/
/******************************/

router.get('/', checkToken.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'post'), postsController.getAllPosts);

/*****************************/
/********* GET POST *********/
/*****************************/

router.get('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'post'), postsController.getPostById);

/*****************************/
/******** CREATE POST ********/
/*****************************/

router.post('/:id', checkToken.verifyToken, validate.postValidation, accessController.allowIfLoggedin, validate.postValidation, postsController.createPost);

/****************************/
/******** UPDATE POST********/
/****************************/

router.put('/:id', checkToken.verifyToken, validate.postValidation, accessController.allowIfLoggedin, postsController.editPost);

/*****************************/
/******** DELETE POST ********/
/*****************************/

router.delete('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, postsController.deletePost);

module.exports = router;
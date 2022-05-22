const express = require('express');
const postsController = require('../controllers/postsController');
const accessController = require('../controllers/accessController');
const verifyToken = require('../middleware/verifyToken');
const validate = require('../middleware/validate')

const router = express.Router();

/******************************/
/********* GET POSTS **********/
/******************************/

router.get('/', verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'post'), postsController.getAllPosts);

/*****************************/
/********* GET POST *********/
/*****************************/

router.get('/:id', verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'post'), postsController.getPostById);

/*****************************/
/********* GET POST *********/
/*****************************/

//router.get('/:id', postsController.getUserPostById);

/*****************************/
/******** CREATE POST ********/
/*****************************/

router.post('/:id', verifyToken, validate.postValidation, accessController.allowIfLoggedin, accessController.grantAccess('createAny', 'post'), validate.postValidation, postsController.createPost);

/****************************/
/******** UPDATE POST********/
/****************************/

router.put('/:id', verifyToken, validate.postValidation, accessController.allowIfLoggedin, accessController.grantAccess('updateAny', 'post'), postsController.editPost);

/*****************************/
/******** DELETE POST ********/
/*****************************/

router.delete('/:id', verifyToken, accessController.allowIfLoggedin, accessController.grantAccess('deleteAny', 'post'), postsController.deletePost);

module.exports = router;
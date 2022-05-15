const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();

/******************************/
/********* GET POSTS **********/
/******************************/

router.get('/', postsController.getAllPosts);

/*****************************/
/********* GET POST *********/
/*****************************/

router.get('/:id', postsController.getPostById);

/*****************************/
/********* GET POST *********/
/*****************************/

//router.get('/:id', postsController.getUserPostById);

/*****************************/
/******** CREATE POST ********/
/*****************************/

router.post('/:id', postsController.createPost);

/****************************/
/******** UPDATE POST********/
/****************************/

router.put('/:id', postsController.editPost);

/*****************************/
/******** DELETE POST ********/
/*****************************/

router.delete('/:id', postsController.deletePost);

module.exports = router;
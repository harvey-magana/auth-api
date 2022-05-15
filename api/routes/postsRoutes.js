const express = require('express');


const router = express.Router();

/******************************/
/********* GET POSTS **********/
/******************************/

router.get('/', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error.message)
  }
});

/*****************************/
/********* GET POST *********/
/*****************************/

router.get('/:id', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error.message)
  }
});

/*****************************/
/********* GET POST *********/
/*****************************/

//router.get('/:id', postsController.getUserPostById);

/*****************************/
/******** CREATE POST ********/
/*****************************/

router.post('/:id', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error.message)
  }
});

/****************************/
/******** UPDATE POST********/
/****************************/

router.put('/:id', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error.message)
  }
});

/*****************************/
/******** DELETE POST ********/
/*****************************/

router.delete('/:id', async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error.message)
  }
});

module.exports = router;
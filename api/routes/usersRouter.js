const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

/************************/
/********* READ *********/
/************************/

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getOneUser);

/************************/
/******** UPDATE ********/
/************************/

router.put('/:id', usersController.updateUser);

/************************/
/******** DELETE ********/
/************************/

router.delete('/:id', usersController.deleteUser);

/************************/
/***** IMAGE UPLOAD *****/
/************************/

router.put('/:id/upload', usersController.uploadImage);

/******************************/
/***** GET UPLOADED IMAGE *****/
/******************************/

router.get('/:id/upload', usersController.getUserImage);

/*************************/
/***** DELETE IMAGE ******/
/*************************/

router.patch('/:id/upload/', usersController.deleteImage);

module.exports = router;
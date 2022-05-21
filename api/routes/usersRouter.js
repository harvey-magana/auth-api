const express = require('express');
const usersController = require('../controllers/usersController');
const accessController = require('../controllers/accessController');
const router = express.Router();

/************************/
/********* READ *********/
/************************/

router.get('/', usersController.getAllUsers);

router.get('/:id', accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'profile'), usersController.getOneUser);

/************************/
/******** UPDATE ********/
/************************/

router.put('/:id', accessController.allowIfLoggedin, accessController.grantAccess('updateAny', 'profile'), usersController.updateUser);

/************************/
/******** DELETE ********/
/************************/

router.delete('/:id', accessController.allowIfLoggedin, accessController.grantAccess('deleteAny', 'profile'), usersController.deleteUser);

/************************/
/***** IMAGE UPLOAD *****/
/************************/

router.put('/:id/upload', accessController.allowIfLoggedin, accessController.grantAccess('updateAny', 'avatar'), usersController.uploadImage);

/******************************/
/***** GET UPLOADED IMAGE *****/
/******************************/

router.get('/:id/upload', accessController.allowIfLoggedin, accessController.grantAccess('readAny', 'avatar'), usersController.getUserImage);

/*************************/
/***** DELETE IMAGE ******/
/*************************/

router.patch('/:id/upload/', accessController.allowIfLoggedin, accessController.grantAccess('deleteAny', 'avatar'), usersController.deleteImage);

module.exports = router;
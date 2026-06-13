const express = require('express');
const usersController = require('../controllers/usersController');
const accessController = require('../controllers/accessController');
const checkToken = require('../utils/utils.tokens');
const router = express.Router();

/************************/
/********* READ *********/
/************************/

router.get('/', checkToken.verifyToken, usersController.getAllUsers);

router.get('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, usersController.getOneUser);

/************************/
/******** UPDATE ********/
/************************/

router.put('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, usersController.updateUser);

/************************/
/******** DELETE ********/
/************************/

router.delete('/:id', checkToken.verifyToken, accessController.allowIfLoggedin, usersController.deleteUser);

/************************/
/***** IMAGE UPLOAD *****/
/************************/

router.put('/:id/upload', checkToken.verifyToken, accessController.allowIfLoggedin, usersController.uploadImage);

/******************************/
/***** GET UPLOADED IMAGE *****/
/******************************/

router.get('/:id/upload', checkToken.verifyToken, accessController.allowIfLoggedin, usersController.getUserImage);

/*************************/
/***** DELETE IMAGE ******/
/*************************/

router.patch('/:id/upload/', checkToken.verifyToken, accessController.allowIfLoggedin, usersController.deleteImage);

/*************************/
/***** UPGRADE USER ******/
/*************************/

router.put('/upgrade/:id', checkToken.verifyToken, accessController.allowIfLoggedin, usersController.upgradeUser);

/**************************/
/***** DOWNGRADE USER *****/
/**************************/

router.put('/downgrade/:id', checkToken.verifyToken, accessController.allowIfLoggedin, usersController.downgradeUser);

module.exports = router;
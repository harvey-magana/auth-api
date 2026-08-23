const express = require('express');
const usersController = require('../controllers/usersController');
const accessController = require('../controllers/accessController');
const checkToken = require('../utils/utils.tokens');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 upload requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

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

router.put('/:id/upload', checkToken.verifyToken, accessController.allowIfLoggedin, uploadLimiter, usersController.uploadImage);

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
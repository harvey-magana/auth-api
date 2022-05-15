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

//router.put('/:id/upload', async (req, res, next) => {});

/******************************/
/***** GET UPLOADED IMAGE *****/
/******************************/

//router.get('/:id/upload', async (req, res, next) => {});

/*************************/
/***** DELETE IMAGE ******/
/*************************/

//router.patch('/:id/upload/', async (req, res, next) => {});

module.exports = router;
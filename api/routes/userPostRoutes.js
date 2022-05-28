const express = require('express');
const userPostController = require('../controllers/userPostController');
//const signTokens = require('../utils/signTokens'); // add signTokens.verifyToken to the route 
const router = express.Router();

router.get('/:id', userPostController.getUserPostById);

module.exports = router;
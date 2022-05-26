const express = require('express');
const userPostController = require('../controllers/userPostController');
const router = express.Router();

router.get('/:id', userPostController.getUserPostById);

module.exports = router;
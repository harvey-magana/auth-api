const express = require('express');

const router = express.Router();


router.post('/register', async (req, res, next) => {
    try {
      const { username, email, password, confirm_password, role } = req.body;

      const user = await Users.findOne({ username: username }).first();
    
        if(user) {
          return res.status(400).json({
              message: 'Username taken...'
          });
        }
    
        const newUser = await Users.add({
            username,
            email, 
            password,
            confirm_password,
            role: role || 'reader'
        });
    
        res.status(201).json(newUser);
    } catch (error) {
      next(error.message);
    }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username: username });

    if(!user) {
      return res.status(404).json({
          message: 'User not found.'
      })
    }

    const response = {
      id: user.id,
      username: user.username,
      role: user.role
  }

  } catch (error) {
    next(error.message);
  }
});

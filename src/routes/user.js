const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create:
router.post('/user/create', async (req, res) => {
  try {
    const newUser = new User({
      username: req.fields.username,
      email: req.fields.email,
    });

    const emailAlreadyExist = await User.findOne({ email: req.fields.email });

    if (emailAlreadyExist) {
      return res.json({ message: 'Email already exist' });
    } else {
      await newUser.save();

      return res.json(newUser);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Read:
router.get('/user', async (req, res) => {
  try {
    const user = await User.findById(req.query.id);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    } else {
      return res.json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update:
router.post('/user/update', async (req, res) => {
  try {
    const userToUpdate = await User.findById(req.query.id);
    const emailAlreadyExist = await User.findOne({ email: req.fields.email });

    if (userToUpdate) {
      userToUpdate.username = req.fields.username;
      userToUpdate.email = req.fields.email;

      if (!emailAlreadyExist) {
        await userToUpdate.save();

        return res.json(userToUpdate);
      } else {
        return res.json({ message: 'Email already exist' });
      }
    } else {
      return res.status(400).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Delete:
router.post('/user/delete', async (req, res) => {
  try {
    const userToDelete = await User.findById(req.query.id);

    if (userToDelete) {
      userToDelete.remove();

      return res.json({ message: 'User removed' });
    } else {
      return res.status(400).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

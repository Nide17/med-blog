const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get user data to keep logged in user token bcz jwt data are stateless
// Get all users
// @access  Private

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
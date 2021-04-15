const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config')
const router = express.Router();
const { auth } = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth/login
// @desc    Login user
// @access  Public

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    // Sign and generate token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role
      },
      config.get('jwtSecret'),
      { expiresIn: '24h' }
    );

    if (!token) throw Error('Couldnt sign the token');

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route   POST api/auth/register
// @desc    Register new user
// @access  Public

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please fill all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');

    // Create salt and hash
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      name,
      email,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    // Sign and generate token
    const token = jwt.sign(
      {
        _id: savedUser._id,
        role: savedUser.role
      },
      config.get('jwtSecret'),
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route   GET api/auth/user
// @desc    Get user data to keep logged in user token bcz jwt data are stateless
// @access  Private: Accessed by any logged in user

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
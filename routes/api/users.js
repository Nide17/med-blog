// CRUD for users
const express = require("express");
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Private

router.get('/', async (req, res) => {

  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.json(users);

  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});


// @route   GET /api/users/:id
// @desc    Get one User
// @access  Needs to be private
router.get('/:id', async (req, res) => {

  let id = req.params.id;
  try {
    //Find the User by id
    await User.findById(id, (err, user) => {
      res.status(200).json(user);
    })

  } catch (err) {
    res.status(400).json({
      msg: 'Failed to retrieve! ' + err.message,
      success: false
    });
  }

});


// @route PUT api/users/:id
// @route UPDATE one User
// @route Private

router.put('/:id', async (req, res) => {

  try {
    //Find the User by id
    const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.status(200).json(user);

  } catch (error) {
    res.status(400).json({
      msg: 'Failed to update! ' + error.message,
      success: false
    });
  }
});


// @route DELETE api/users/:id
// @route delete a User
// @route Private
//:id placeholder, findById = we get it from the parameter in url
router.delete('/:id', async (req, res) => {

  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error('User is not found!')

    const removedUser = await user.remove();

    if (!removedUser)
      throw Error('Something went wrong while deleting!');

    res.status(200).json({ msg: "Deleted successfully!" });

  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message
    });
  }

});


module.exports = router;
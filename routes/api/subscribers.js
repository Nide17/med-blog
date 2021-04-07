const express = require("express");
const config = require('config')
const router = express.Router();
const auth = require('../../middleware/auth');

// SubscribedUser Model
const SubscribedUser = require('../../models/SubscribedUser');


// @route   GET /api/subscribers
// @desc    Get subscribers
// @access  Needs to be private

router.get('/', async (req, res) => {

    try {
      const subscribers = await SubscribedUser.find()
        //sort subscribers by subscription_date
        .sort({ subscription_date: -1 })
  
      if (!subscribers) throw Error('No subscribers found');
  
      res.status(200).json(subscribers);
    } catch (err) {
      res.status(400).json({ msg: err.message })
    }
  });

// @route   POST /api/subscribers
// @desc    Subscribe to our newsletter
// @access  Public

router.post('/', async (req, res) => {
    const { name, email } = req.body;

    // Simple validation
    if (!name || !email) {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }

    try {
        const subscriber = await SubscribedUser.findOne({ email });
        if (subscriber) throw Error('You had already subscribed!');

        const newSubscriber = new SubscribedUser({
            name,
            email
        });

        const savedSubscriber = await newSubscriber.save();
        if (!savedSubscriber) throw Error('Something went wrong while subscribing!');

        res.status(200).json({
            subscriber: {
                _id: savedSubscriber._id,
                name: savedSubscriber.name,
                email: savedSubscriber.email
            }
        });

    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});


// @route GET api/subscribers/:id
// @route GET one Subscriber
// @route Private

router.get('/:id', async (req, res) => {
    try {
      //Find the subscriber by id
      const subscriber = await SubscribedUser.findById(req.params.id);
      if (!subscriber) throw Error('subscriber is not found!')

    } catch (err) {
      res.status(400).json({
        msg: 'Failed to retrieve! ' + err.message,
        success: false
      });
    }
  
  });

// @route DELETE api/subscribers
// @route delete a subscriber
// @route Private

//:id placeholder, findId=we get it from the parameter in url
router.delete('/:id', async (req, res) => {

    try {
      //Find the subscriber to delete by id first
      const subscriber = await SubscribedUser.findById(req.params.id);
      if (!subscriber) throw Error('subscriber is not found!')
  
      const removedSubscriber = await subscriber.remove();
  
      if (!removedSubscriber)
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
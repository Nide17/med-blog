const express = require("express");
const config = require('config')
const router = express.Router();
const auth = require('../../middleware/auth');

// SubscribedUser Model
const SubscribedUser = require('../../models/SubscribedUser');


// @route   GET /api/posts/newsletter
// @desc    Get subscribers
// @access  Needs to be private

router.get('/newsletter', (req, res) => {

    //find Method to find in the subscribers in db
    SubscribedUser.find()

        //sort subscribers by date desc(-1)
        .sort({ date: -1 })

        //return a promise
        .then(subscribers => res.json(subscribers));
});


// @route   POST /api/posts/newsletter
// @desc    Subscribe to our newsletter
// @access  Public

router.post('/newsletter', async (req, res) => {
    const { name, email } = req.body;

    // Simple validation
    if (!name || !email) {
        return res.status(400).json({ msg: 'Please enter all fields' });
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
                id: savedSubscriber._id,
                name: savedSubscriber.name,
                email: savedSubscriber.email
            }
        });

    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
// auth middleware to protect routes
const { auth, authRole } = require('../../middleware/auth');


//Review Model : use capital letters since it's a model
const Review = require('../../models/Review');

// @route GET api/reviews
// @route Get All reviews
// @route Public

//we use router. instead of app. and / because we are already in this dir
router.get('/', async (req, res) => {

    try {
        const reviews = await Review.find()
            //sort reviews by creation_date
            .sort({ creation_date: -1 })

        if (!reviews) throw Error('No reviews found');

        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// @route GET api/reviews/:id
// @route GET one Review
// @route Private
//:id placeholder, findId=we get it from the parameter in url

router.get('/:id', auth, async (req, res) => {
    try {
        //Find the Review by id
        await Review.findById(req.params.id, (err, review) => {
            res.status(200).json(review);
        })
            // Use the name of the schema path instead of the collection name
            .populate('category')
            .populate('taken_by')

    } catch (err) {
        res.status(400).json({
            msg: 'Failed to retrieve! ' + err.message,
            success: false
        });
    }

});

// @route POST api/reviews
// @route Create a review
// @route Accessed by Admin and Creator

router.post("/", auth, async (req, res) => {

    try {

        const newReview = new Review(req.body);
        const savedReview = await newReview.save();

        if (!savedReview) throw Error('Something went wrong during creation!');

        res.status(200).json(savedReview);

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).send(err.errors);
        }
        res.status(500).send("Something went wrong");
    }
});

// @route PUT api/reviews/:id
// @route Move Review from one quiz to another
// @access Private: Accessed by admin only

router.put('/:id', authRole(['Creator', 'Admin']), async (req, res) => {

    try {
        //Find the Review by id
        const review = await Review.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json(review);

    } catch (err) {
        res.status(400).json({
            msg: 'Failed to update! ' + err.message,
            success: false
        });
    }
});


// @route DELETE api/reviews
// @route delete a review
// @route Private: Accessed by admin only

//:id placeholder, findId=we get it from the parameter in url
router.delete('/:id', auth, authRole(['Creator', 'Admin']), async (req, res) => {

    try {
        //Find the review to delete by id first
        const review = await Review.findById(req.params.id);
        if (!review) throw Error('Review is not found!')

        const removedReview = await Review.remove();

        if (!removedReview)
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
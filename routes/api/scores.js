const express = require("express");
const router = express.Router();

// auth middleware to protect routes
const { auth, authRole } = require('../../middleware/auth');

//Score Model : use capital letters since it's a model
const Score = require('../../models/Score');

// @route GET api/scores
// @route Get All scores
// @route Private: accessed by logged in user

//we use router. instead of app. and / because we are already in this dir
router.get('/', auth, async (req, res) => {

  try {
    const scores = await Score.find()
      //sort scores by creation_date
      .sort({ test_date: -1 })
      .populate('quiz')
      .populate('category')
      .populate('taken_by')

    if (!scores) throw Error('No scores found');

    res.status(200).json(scores);

  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
});

// @route POST api/scores
// @route Create a Score
// @route Private: accessed by logged in user

router.post("/", auth, async (req, res) => {

  try {

    const newScore = await Score.create(req.body);
    res.send(newScore);

  } catch (err) {
    console.log(err);

    if (err.name === "ValidationError") {
      return res.status(400).send(err.errors);
    }
    res.status(500).send("Something went wrong");
  }
});

// @route GET api/scores/:id
// @route GET one Score
// @route Private: accessed by logged in user

//:id placeholder, findId=we get it from the parameter in url
router.get('/:id', auth, (req, res) => {

  //Find the Score by id
  Score.findById(req.params.id)

    //return a promise
    .then(score => res.json(score))
    // if id not exist or if error
    .catch(err => res.status(404).json({ success: false }));
});


// @route DELETE api/scores
// @route delete a Score
// @route Private: Accessed by admin only

//:id placeholder, findId=we get it from the parameter in url
router.delete('/:id', auth, authRole(['Admin']), (req, res) => {

  //Find the Score to delete by id first
  Score.findById(req.params.id)

    //returns promise 
    .then(score => score.remove().then(() => res.json({ success: true })))
    // if id not exist or if error
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
const express = require("express");
const router = express.Router();
// auth middleware to protect routes
const auth = require('../../middleware/auth')

//Question Model : use capital letters since it's a model
const Question = require('../../models/Question');

// GET ENDPOINT //
// @route GET api/questions
// @route Get All questions
// @route Public

//we use router. instead of app. and / because we are already in this dir
router.get('/', (req, res) => {

  //find Method to find in the questions in db
  Question.find()

    //sort questions by date desc(-1)
    .sort({ date: -1 })

    //return a promise
    .then(questions => res.json(questions));
});


// POST ENDPOINT //
// @route POST api/questions
// @route Create a Question
// @route Public

router.post("/", auth, async (req, res) => {
  try {
    let newQuestion = await Question.findOne({ questionText: req.body.questionText });

    if (newQuestion) {
      return res.status(400).send("A Question already exists!");
    }

    const result = await Question.create(req.body);
    res.send(result);

  } catch (err) {
    console.log(err);

    if (err.name === "ValidationError") {
      return res.status(400).send(err.errors);
    }
    res.status(500).send("Something went wrong");
  }
});

// GET ENDPOINT //
// @route GET api/questions/:id
// @route GET one Question
// @route Private

//:id placeholder, findId=we get it from the parameter in url
router.get('/:id', auth, (req, res) => {

  //Find the Question by id
  Question.findById(req.params.id)

    //return a promise
    .then(question => res.json(question))
    // if id not exist or if error
    .catch(err => res.status(404).json({ success: false }));
});


// @route DELETE api/questions
// @route delete a Question
// @route Private

//:id placeholder, findId=we get it from the parameter in url
router.delete('/:id', (req, res) => {

  //Find the Question to delete by id first
  Question.findById(req.params.id)

    //returns promise 
    .then(question => question.remove().then(() => res.json({ success: true })))
    // if id not exist or if error
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
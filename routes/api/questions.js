const express = require("express");
const router = express.Router();
// auth middleware to protect routes
const { auth, authRole } = require('../../middleware/auth');


//Question Model : use capital letters since it's a model
const Question = require('../../models/Question');
const Quiz = require('../../models/Quiz');
const Category = require('../../models/Category');

// @route GET api/questions
// @route Get All questions
// @route Public

//we use router. instead of app. and / because we are already in this dir
router.get('/', async (req, res) => {

  try {
    const questions = await Question.find()
      //sort questions by creation_date
      .sort({ creation_date: -1 })
      .populate('category')
      .populate('quiz')

    if (!questions) throw Error('No questions found');

    res.status(200).json(questions);
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
});

// @route POST api/questions
// @route Create a Question
// @route Accessed by Admin and Creator

router.post("/", auth, authRole(['Admin', 'Creator']), async (req, res) => {
  try {
    let newQuestion = await Question.findOne({ questionText: req.body.questionText });

    if (newQuestion) {
      return res.status(400).send("A Question already exists!");
    }

    const result = await Question.create(req.body);
    res.send(result);

    // Update the Quiz on Question creation
    await Quiz.updateOne(
      { "_id": req.body.quiz },
      { $push: { "questions": result._id } }
    );


  } catch (err) {
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

router.get('/:id', async (req, res) => {
  try {
    //Find the question by id
    await Question.findById(req.params.id, (err, question) => {
      res.status(200).json(question);
    })
      // Use the name of the schema path instead of the collection name
      .populate('category')
      .populate('quiz')

  } catch (err) {
    res.status(400).json({
      msg: 'Failed to retrieve! ' + err.message,
      success: false
    });
  }

});

// @route PUT api/questions/:id
// @route UPDATE one Question
// @access Private: Accessed by admin only

router.put('/:id', async (req, res) => {

  try {
      //Find the Question by id
      const question = await Question.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      res.status(200).json(question);

  } catch (err) {
      res.status(400).json({
          msg: 'Failed to update! ' + err.message,
          success: false
      });
  }
});


// @route DELETE api/questions
// @route delete a Question
// @route Private: Accessed by admin only

//:id placeholder, findId=we get it from the parameter in url
router.delete('/:id', auth, authRole(['Admin']), async (req, res) => {

  try {
    //Find the Question to delete by id first
    const question = await Question.findById(req.params.id);
    if (!question) throw Error('Question is not found!')

    const removedQuestion = await question.remove();

    if (!removedQuestion)
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
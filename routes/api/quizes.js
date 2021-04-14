const express = require("express");
const router = express.Router();

// Quiz Model
const Quiz = require('../../models/Quiz');
const Category = require('../../models/Category');
const Question = require('../../models/Question');

// @route   GET /api/quizes
// @desc    Get quizes
// @access  Needs to be private
router.get('/', async (req, res) => {

    try {
        const quizes = await Quiz.find()
            //sort quizes by creation_date
            .sort({ creation_date: -1 })
            .populate('category')
            .populate('questions')
            .populate('created_by')

        if (!quizes) throw Error('No quizes found');

        res.status(200).json(quizes);
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// @route   GET /api/quizes/:id
// @desc    Get one quiz
// @access  Needs to be private
router.get('/:id', async (req, res) => {

    let id = req.params.id;
    try {
        //Find the quiz by id
        await Quiz.findById(id, (err, quiz) => {
            res.status(200).json(quiz);
        })
        // Use the name of the schema path instead of the collection name
        .populate('category')
        .populate('questions')

    } catch (err) {
        res.status(400).json({
            msg: 'Failed to retrieve! ' + err.message,
            success: false
        });
    }

});

// @route   POST /api/quizes
// @desc    Create quiz
// @access  Have to be private
router.post('/', async (req, res) => {

    const { title, description, category, created_by } = req.body;

    // Simple validation
    if (!title || !description || !category) {
        return res.status(400).json({ msg: 'There are missing info!' });
    }

    try {
        const quiz = await Quiz.findOne({ title });
        if (quiz) throw Error('Quiz already exists!');

        const newQuiz = new Quiz({
            title,
            description,
            category,
            created_by
        });

        const savedQuiz = await newQuiz.save();

        // Update the Category on Quiz creation
        await Category.updateOne(
            { "_id": category },
            { $push: { "quizes": savedQuiz._id } }
        );

        if (!savedQuiz) throw Error('Something went wrong during creation!');

        res.status(200).json({
            _id: savedQuiz._id,
            title: savedQuiz.title,
            description: savedQuiz.description,
            category: savedQuiz.category,
            created_by: savedQuiz.created_by
        });

    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});


// @route PUT api/quizes/:id
// @route UPDATE one Quiz
// @route Private
router.put('/:id', async (req, res) => {

    try {
        //Find the Quiz by id
        const updatedQuiz = await Quiz.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json(updatedQuiz);

    } catch (error) {
        res.status(400).json({
            msg: 'Failed to update! ' + error.message,
            success: false
        });
    }
});


// @route DELETE api/quizes/:id
// @route delete a Quiz
// @route Private
//:id placeholder, findById = we get it from the parameter in url
router.delete('/:id', async (req, res) => {

    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) throw Error('Quiz is not found!')

        const removedQuiz = await quiz.remove();

        if (!removedQuiz)
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

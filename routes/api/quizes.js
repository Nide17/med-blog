const express = require("express");
// const config = require('config')
const router = express.Router();
// const auth = require('../../middleware/auth');

// Quiz Model
const Quiz = require('../../models/Quiz');

// @route   GET /api/quizes/quiz
// @desc    Get quizes
// @access  Needs to be private

router.get('/quiz', (req, res) => {

    //find Method to find in the quizes in db
    Quiz.find()

        //sort quizes by date desc(-1)
        .sort({ date: -1 })

        //return a promise
        .then(quizes => res.json(quizes));
});

// @route   POST /api/quizes/quiz
// @desc    Create quiz
// @access  Public

router.post('/quiz', async (req, res) => {
    const { title, description, category, questions, created_by } = req.body;

    // Simple validation
    if (!title || !description) {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }

    try {
        // const Quiz = await Quiz.findOne({ title });
        // if (quiz) throw Error('Quiz already exists!');

        const newQuiz = new Quiz({
            title,
            description,
            category,
            questions,
            created_by
        });

        const savedQuiz = await newQuiz.save();
        if (!savedQuiz) throw Error('Something went wrong during creation!');

        res.status(200).json({
            quiz: {
                id: savedQuiz._id,
                title: savedQuiz.title,
                description: savedQuiz.description,
                category: savedQuiz.category,
                questions: savedQuiz.questions,
                created_by: savedQuiz.created_by
            }
        });

    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

module.exports = router;

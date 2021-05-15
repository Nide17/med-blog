const express = require("express");
const router = express.Router();

// Quiz Model
const Quiz = require('../../models/Quiz');
const Category = require('../../models/Category');
const User = require('../../models/User');
const SubscribedUser = require('../../models/SubscribedUser');

const { auth, authRole } = require('../../middleware/auth');
const sendEmail = require("./pswd-reset/sendEmail");

// @route   GET /api/quizes
// @desc    Get all quizes
// @access  Public
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
router.get('/:id', auth, async (req, res) => {

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

router.post('/', auth, authRole(['Creator', 'Admin']), async (req, res) => {

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

        if (!savedQuiz) throw Error('Something went wrong during creation!');

        // Update the Category on Quiz creation
        await Category.updateOne(
            { "_id": category },
            { $push: { "quizes": savedQuiz._id } }
        );

        // IF THE CATEGORY IS NURSING
        if (savedQuiz.category === '607df6aa5560040015c0291a') {

            // Send email to subscribers the Category on Quiz creation
            const subscribers = await SubscribedUser.find()
            const quizAuthor = await User.findById(savedQuiz.created_by).select("name")

            const clientURL = process.env.NODE_ENV === 'production' ?
                'http://www.quizblog.xyz' : 'http://localhost:3000'

            subscribers.forEach(sub => {

                sendEmail(
                    sub.email,
                    "Updates!! New nursing quiz that may be interests you",
                    {
                        name: sub.name,
                        author: quizAuthor.name,
                        newQuiz: savedQuiz.title,
                        quizesLink: `${clientURL}/view-quiz/${savedQuiz._id}`
                    },
                    "./template/newquiz.handlebars");
            });

        }

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
// @route Private: Accessed by admin only

router.put('/:id', auth, authRole(['Creator', 'Admin']), async (req, res) => {

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
// @route Private: Accessed by admin only
//:id placeholder, findById = we get it from the parameter in url

router.delete('/:id', auth, authRole(['Creator', 'Admin']), async (req, res) => {

    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) throw Error('Quiz is not found!')

        const removedQuiz = await quiz.remove();

        if (!removedQuiz)
            throw Error('Something went wrong while deleting!');

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: err.message
        });
    }
});

module.exports = router;
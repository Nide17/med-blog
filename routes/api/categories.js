const express = require("express");
// const config = require('config')
const router = express.Router();
// const auth = require('../../middleware/auth');

// Category Model
const Category = require('../../models/Category');

// @route   GET /api/categories/category
// @desc    Get categories
// @access  Needs to be private

router.get('/category', (req, res) => {

    //find Method to find in the categories in db
    Category.find()

        //sort categories by date desc(-1)
        .sort({ date: -1 })

        //return a promise
        .then(categories => res.json(categories));
});


// @route   POST /api/categories/category
// @desc    Subscribe to our category
// @access  Public

router.post('/category', async (req, res) => {
    const { title, description } = req.body;

    // Simple validation
    if (!title || !description) {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }

    try {
        // const Category = await Category.findOne({ title });
        // if (category) throw Error('Category already exists!');

        const newCategory = new Category({
            title,
            description
        });

        const savedCategory = await newCategory.save();
        if (!savedCategory) throw Error('Something went wrong during creation!');

        res.status(200).json({
            category: {
                id: savedCategory._id,
                title: savedCategory.title,
                description: savedCategory.description
            }
        });

    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
// Category Model
const Category = require('../../models/Category');

// @route   GET /api/categories
// @desc    Get categories
// @access  Needs to be private

router.get('/', async (req, res) => {

    try {
        const categories = await Category.find()
            //sort categories by creation_date
            .sort({ creation_date: -1 })
            .populate('quiz')

        if (!categories) throw Error('No categories found');

        res.status(200).json(categories);

    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// @route   POST /api/categories
// @desc    Create a category
// @access  Have to be private

router.post('/', async (req, res) => {
    const { title, description, quizes, created_by } = req.body;

    // Simple validation
    if (!title || !description) {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }

    try {
        const category = await Category.findOne({ title });
        if (category) throw Error('Category already exists!');

        const newCategory = new Category({
            title,
            description,
            quizes,
            created_by
        });

        const savedCategory = await newCategory.save();
        if (!savedCategory) throw Error('Something went wrong during creation!');

        res.status(200).json({
                id: savedCategory._id,
                title: savedCategory.title,
                description: savedCategory.description,
                quizes: savedCategory.quizes,
                created_by: savedCategory.created_by
            });

    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// @route PUT api/categories/:id
// @route UPDATE one Category
// @route Private

router.put('/:id', async (req, res) => {

    try {
        //Find the Category by id
        const category = await Category.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json(category);

    } catch (error) {
        res.status(400).json({
            msg: 'Failed to update! ' + error.message,
            success: false
        });
    }
});

// @route DELETE api/categories/:id
// @route delete a Category
// @route Private
//:id placeholder, findById = we get it from the parameter in url
router.delete('/:id', async (req, res) => {

    try {
        const category = await Category.findById(req.params.id);
        if (!category) throw Error('Category is not found!')

        const removedCategory = await category.remove();

        if (!removedCategory)
            throw Error('Something went wrong while deleting!');

        res.status(200).json({ msg: "Deleted successfully!" });

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: error.message
        });
    }

});

module.exports = router;
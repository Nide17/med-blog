const express = require("express");
const router = express.Router();
const { resourceUpload } = require('./utils/resourceUpload.js');

// Resource Model
const Resource = require('../../models/Resource');

const { auth, authRole } = require('../../middleware/auth');

// @route   GET /api/resources
// @desc    Get all resources
// @access  Public
router.get('/', async (req, res) => {

    // Pagination
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    var query = {}

    query.limit = limit
    query.skip = skip

    try {
        const resources = await Resource.find({}, {}, query)

            //sort resources by creation_date
            .sort({ creation_date: -1 })
            .populate('category')
            .populate('uploaded_by')

        if (!resources) throw Error('No resources found');

        res.status(200).json(resources);
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});

// @route   GET /api/resources/:id
// @desc    Get one resource
// @access  Needs to private
router.get('/:id', auth, async (req, res) => {

    let id = req.params.id;
    try {
        //Find the resource by id
        await Resource.findById(id, (err, resource) => {
            res.status(200).json(resource);
        })
            // Use the name of the schema path instead of the collection name
            .populate('category')

    } catch (err) {
        res.status(400).json({
            msg: 'Failed to retrieve! ' + err.message,
            success: false
        });
    }

});

// @route   POST /api/resources
// @desc    Create resource
// @access  Have to private

router.post('/', auth, authRole(['Creator', 'Admin']), resourceUpload.single("resource_file"),async (req, res) => {

    const r_file = req.file ? req.file : null
    const { title, description, category, uploaded_by } = req.body;

    // Simple validation
    if (!title || !description || !category) {
        return res.status(400).json({ msg: 'There are missing info!' });
    }

    try {
        const resource = await Resource.findOne({ title });
        if (resource) throw Error('Resource already exists!');

        const newResource = new Resource({
            title,
            description,
            category,
            resource_file: r_file.location,
            uploaded_by
        });

        const savedResource = await newResource.save();

        if (!savedResource) throw Error('Something went wrong during creation!');

        res.status(200).json({
            _id: savedResource._id,
            title: savedResource.title,
            description: savedResource.description,
            category: savedResource.category,
            resource_file: savedResource.resource_file,
            uploaded_by: savedResource.uploaded_by
        });

    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// @route PUT api/resources/:id
// @route UPDATE one Resource
// @route Private: Accessed by admin only

router.put('/:id', auth, authRole(['Creator', 'Admin']), async (req, res) => {

    try {
        //Find the Resource by id
        const updatedResource = await Resource.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json(updatedResource);

    } catch (error) {
        res.status(400).json({
            msg: 'Failed to update! ' + error.message,
            success: false
        });
    }
});

// @route DELETE api/resources/:id
// @route delete a Resource
// @route Private: Accessed by admin only
//:id placeholder, findById = we get it from the parameter in url

router.delete('/:id', auth, authRole(['Creator', 'Admin']), async (req, res) => {

    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) throw Error('Resource is not found!')

        // Delete resource
        const removedResource = await resource.remove();

        if (!removedResource)
            throw Error('Something went wrong while deleting!');

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: err.message
        });
    }
});

module.exports = router;
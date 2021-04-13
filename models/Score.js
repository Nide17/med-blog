// Bring in Mongo
const mongoose = require('mongoose');

//initialize Mongo schema
const Schema = mongoose.Schema;

//create a schema object
const ScoreSchema = new Schema({
    marks: {
        type: Number,
        required: true
    },
    out_of: {
        type: Number,
        required: true
    },
    test_date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'quiz'
    },
    taken_by: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

//Score: the name of this model
module.exports = mongoose.model('score', ScoreSchema);
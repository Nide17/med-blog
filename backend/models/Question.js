// Bring in Mongo
const mongoose = require('mongoose');

//initialize Mongo schema
const Schema = mongoose.Schema;

//create a schema object
const QuestionSchema = new Schema({
    questionText: {
        type: String,
        required: true
    },

    answerOptions: {
        type: [
            {
                answerText: {
                    type: String,
                    required: true
                },
                isCorrect: {
                    type: Boolean,
                    required: true
                }
            }
        ]
    },

    date: {
        type: Date,
        default: Date.now
    }
});

//Question: the name of this model
module.exports = mongoose.model('question', QuestionSchema);
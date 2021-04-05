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
                    required: true,
                    default: false
                }
            }
        ]
    },

    creation_date: {
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
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    last_updated_by: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

//Question: the name of this model
module.exports = mongoose.model('question', QuestionSchema);
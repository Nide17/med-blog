// Bring in Mongo
const mongoose = require('mongoose');

//initialize Mongo schema
const Schema = mongoose.Schema;

//create a schema object
const ReviewSchema = new Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    taken_by: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    questions: [
        {
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
                        },
                        choosen: {
                            type: Boolean,
                            required: true,
                            default: false
                        }
                    }
                ]
            }
        }
    ]

});

//review: the name of this model
module.exports = mongoose.model('review', ReviewSchema);
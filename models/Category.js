// Bring in Mongo
const mongoose = require('mongoose');

//initialize Mongo schema
const Schema = mongoose.Schema;

//create a schema object
const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  quizes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'quiz'
    }
  ],
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    unique: true
  },
  last_updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    unique: true
  }
});

//Category: the name of this model
module.exports = mongoose.model('category', CategorySchema);

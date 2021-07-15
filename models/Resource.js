// Bring in Mongo
const mongoose = require('mongoose');

//initialize Mongo schema
const Schema = mongoose.Schema;

//create a schema object
const ResourceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  resource_file: String,
  creation_date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  uploaded_by: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  last_updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

//Resource: the name of this model
module.exports = mongoose.model('resource', ResourceSchema);

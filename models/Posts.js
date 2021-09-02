const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PhotoSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// created model and write required document
const Posts = mongoose.model('Posts', PhotoSchema);

module.exports = Posts;

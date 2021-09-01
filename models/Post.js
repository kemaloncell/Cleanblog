const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  name: String,
  message: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// created model and write required document
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

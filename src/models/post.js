const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please write a title'],
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model('Post', postSchema);

module.exports = Posts;

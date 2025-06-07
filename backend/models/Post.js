// models/Post.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: String,
  content: String,
});

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

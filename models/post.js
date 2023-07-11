const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

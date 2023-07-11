const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  commentId: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
  like: { type: Boolean, required: true },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;

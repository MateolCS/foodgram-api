const mongoose = require("mongoose");
const Comment = require("../models/comment-model");
const Post = require("../models/post-model");
// @desc    Get all comments by post id
// @route   GET /api/comments/:pid
// @access  Private
const getAllCommentsByPostId = async (req, res) => {
  const postId = req.params.pid;

  let comments;
  try {
    comments = await Comment.find({ post: postId });
    res.json({ comments: comments });
    res.status(200);
  } catch (error) {
    return next(new HttpError("Could not get comments", 500));
  }
};

// @desc    Create a new comment
// @route   POST /api/comments/:pid
// @access  Private
const createComment = async (req, res) => {
  const { content, author } = req.body;
  const postId = req.params.pid;

  let post;

  try {
    post = await Post.findById(postId).populate("comments");
  } catch (error) {
    return next(new HttpError("Could not get post, invalid postId", 500));
  }

  const createdComment = new Comment({
    content,
    author,
    post: postId,
  });

  try {
    const commentSession = await mongoose.startSession();
    commentSession.startTransaction();
    await createdComment.save({ session: commentSession });
    post.comments.push(createdComment);
    await post.save({ session: commentSession });
    await commentSession.commitTransaction();
  } catch (error) {
    return next(new HttpError("Could not create comment", 500));
  }

  res.status(201);
  res.json({ comment: createdComment });
};

module.exports = {
  getAllCommentsByPostId,
  createComment,
};

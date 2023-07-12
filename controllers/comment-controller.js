const mongoose = require("mongoose");
const Comment = require("../models/comment-model");

// @desc    Get all comments by post id
// @route   GET /api/comments/:pid
// @access  Private
const getAllCommentsByPostId = async (req, res) => {};

// @desc    Create a new comment
// @route   POST /api/comments/:pid
// @access  Private
const createComment = async (req, res) => {};

module.exports = {
  getAllCommentsByPostId,
  createComment,
};

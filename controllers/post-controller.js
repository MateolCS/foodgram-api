const mongoose = require("mongoose");
const Post = require("../models/post-model");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getAllPosts = async (req, res, next) => {};

// @desc    Get post by post id
// @route   GET /api/posts/:pid
// @access  Private
const getPostById = async (req, res, next) => {};

// @desc    Get posts by user id
// @route   GET /api/posts/:uid
// @access  Private
const getPostsByUserId = async (req, res, next) => {};

// @desc    Get posts by category id
// @route   GET /api/posts/:cid
// @access  Private
const getPostsByCategoryId = async (req, res, next) => {};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {};

// @desc    Update post by post id
// @route   PATCH /api/posts/:pid
// @access  Private
const updatePostById = async (req, res, next) => {};

// @desc    Delete post by post id
// @route   DELETE /api/posts/:pid
// @access  Private
const deletePostById = async (req, res, next) => {};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  getPostsByCategoryId,
  createPost,
  updatePostById,
  deletePostById,
};

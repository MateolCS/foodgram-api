const mongoose = require("mongoose");
const Post = require("../models/post-model");

const HttpError = require("../models/http-error");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
const getAllPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find()
      .populate("creator")
      .populate("category")
      .populate("comments");
    res.status(200);
    res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  } catch (err) {
    return next(
      new HttpError("Fetching posts failed, please try again later", 500)
    );
  }
};

// @desc    Get post by post id
// @route   GET /api/posts/:pid
// @access  Private
const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;

  try {
    post = await Post.findById(postId)
      .populate("creator")
      .populate("comments")
      .populate("category");

    res.status(200);
    res.json({ post: post.toObject({ getters: true }) });
  } catch (err) {
    return next(
      new HttpError("Fetching post failed, please try again later", 500)
    );
  }
};

// @desc    Get posts by user id
// @route   GET /api/posts/:uid
// @access  Private
const getPostsByUserId = async (req, res, next) => {
  const userId = req.user.id;

  let posts;

  try {
    posts = await Post.find({ creator: userId })
      .populate("creator")
      .populate("category")
      .populate("comments");

    res.status(200);
    res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  } catch (err) {
    return next(
      new HttpError("Fetching posts failed, please try again later", 500)
    );
  }
};

// @desc    Get posts by category id
// @route   GET /api/posts/:cid
// @access  Private
const getPostsByCategoryId = async (req, res, next) => {
  const categoryId = req.params.cid;

  let posts;

  try {
    posts = await Post.find({ category: categoryId })
      .populate("creator")
      .populate("category")
      .populate("comments");

    res.status(200);
    res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  } catch (err) {
    return next(
      new HttpError("Fetching posts failed, please try again later", 500)
    );
  }
};

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

const mongoose = require("mongoose");
const User = require("../models/user-model");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Private
const registerUser = async (req, res, next) => {};

// @desc   Sign in user
// @route   POST /api/users/login
// @access  Private
const loginUser = async (req, res, next) => {};

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (error) {
    return next(new HttpError("Could not get users", 500));
  }

  res.status(200);
  res.json({ users: users });
};

// @desc    Get user by user id
// @route   GET /api/users/:uid
// @access  Private
const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Could not get user, invalid userId", 500));
  }

  res.status(200);
  res.json({ user: user });
};

// @desc    Update user by user id
// @route   PATCH /api/users/:uid
// @access  Private
const updateUserById = async (req, res, next) => {
  const userId = req.params.uid;
  const { username, email, image } = req.body;

  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Could not get user, invalid userId", 500));
  }

  user.username = username;
  user.email = email;
  user.image = image;

  try {
    await user.save();
  } catch (error) {
    return next(new HttpError("Could not update user", 500));
  }

  res.status(200);
  res.json({ user: user });
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  loginUser,
};

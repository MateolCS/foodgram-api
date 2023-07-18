const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const HttpError = require("../models/http-error");
const User = require("../models/user-model");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Private
const registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed", 422));
  }

  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createdUser = new User({
    username,
    email,
    password: hashedPassword,
    image: "https://via.placeholder.com/150",
    posts: [],
    comments: [],
  });

  try {
    await createdUser.save();
    createdUser.toObject({ getters: true });
  } catch (error) {
    return next(new HttpError("Could not create user", 500));
  }

  const userToReturn = {
    id: createdUser._id,
    username: createdUser.username,
    email: createdUser.email,
    image: createdUser.image,
    posts: createdUser.posts,
    comments: createdUser.comments,
    token: generateToken(createdUser),
  };

  res.status(201);
  res.json({ user: userToReturn });
};

// @desc   Sign in user
// @route   POST /api/users/login
// @access  Private
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed", 422));
  }

  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
      .populate("posts")
      .populate("comments");
  } catch (error) {
    return next(new HttpError("Could not login user", 500));
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    return next(new HttpError("Incorrect password", 401));
  }

  const userToReturn = {
    id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    image: existingUser.image,
    posts: existingUser.posts,
    comments: existingUser.comments,
    token: generateToken(existingUser),
  };

  res.status(200);
  res.json({ user: userToReturn });
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({})
      .select("-password")
      .populate("posts")
      .populate("comments");
  } catch (error) {
    return next(new HttpError("Could not get users", 500));
  }

  res.status(200);
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// @desc    Get user by user id
// @route   GET /api/users/:uid
// @access  Private
const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;

  try {
    user = await User.findById(userId).populate("posts").populate("comments");
  } catch (error) {
    return next(new HttpError("Could not get user, invalid userId", 500));
  }

  res.status(200);
  res.json({ user: user.toObject({ getters: true }) });
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
  res.json({ user: user.toObject({ getters: true }) });
};

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  loginUser,
};

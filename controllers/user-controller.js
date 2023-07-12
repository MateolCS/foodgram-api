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
const getAllUsers = async (req, res, next) => {};

// @desc    Get user by user id
// @route   GET /api/users/:uid
// @access  Private
const getUserById = async (req, res, next) => {};

// @desc    Update user by user id
// @route   PATCH /api/users/:uid
// @access  Private
const updateUserById = async (req, res, next) => {};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  loginUser,
};

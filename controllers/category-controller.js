const mongoose = require("mongoose");
const Category = require("../models/category-model");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
const getAllCategories = async (req, res) => {};

// @desc    Get category by category id
// @route   GET /api/categories/:cid
// @access  Private
const getCategoryById = async (req, res) => {};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res) => {};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
};

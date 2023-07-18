const mongoose = require("mongoose");
const Category = require("../models/category-model");

const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
const getAllCategories = async (req, res, next) => {
  let categories;
  try {
    categories = await Category.find({});
    res.json({ categories: categories });
    res.status(200);
  } catch (err) {
    return next(new HttpError("Could not get categories", 500));
  }
};

// @desc    Get category by category id
// @route   GET /api/categories/:cid
// @access  Private
const getCategoryById = async (req, res, next) => {
  const categoryId = req.params.cid;
  let category;
  try {
    category = await Category.findById(categoryId);
  } catch (error) {
    return next(new HttpError("Could not get category", 500));
  }

  if (!category) {
    return next(new HttpError("Category not found", 404));
  }

  res.status(200);
  res.json({ category: category.toObject({ getters: true }) });
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private
const createCategory = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name } = req.body;

  const createdCategory = new Category({
    name,
    posts: [],
  });
  try {
    await createdCategory.save();
    res.status(201);
    res.json({
      category: createdCategory.toObject({ getters: true }),
    });
  } catch (error) {
    return next(new HttpError("Could not create category", 500));
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
};

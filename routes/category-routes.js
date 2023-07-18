const express = require("express");
const { check } = require("express-validator");
const categoryController = require("../controllers/category-controller");

const router = express.Router();

router.get("/", categoryController.getAllCategories);

router.post(
  "/",
  [check("name").not().isEmpty()],
  categoryController.createCategory
);

router.get("/:cid", categoryController.getCategoryById);

module.exports = router;

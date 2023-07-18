const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:uid", userController.getUserById);
router.patch("/:uid", userController.updateUserById);
router.post(
  "/register",
  [
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail().not().isEmpty(),
    check("password").isLength({ min: 6 }),
    check("password-confirmation")
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          return false;
        } else {
          return true;
        }
      }),
  ],
  userController.registerUser
);
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail().not().isEmpty(),
    check("password").isLength({ min: 6 }),
  ],
  userController.loginUser
);

module.exports = router;

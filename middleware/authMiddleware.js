const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user-model");
const HttpError = require("../models/http-error");

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      return next(new HttpError("Not authorized to access this route", 401));
    }
  }

  if (!token) {
    return next(new HttpError("Not authorized to access this route", 401));
  }
};

module.exports = authMiddleware;

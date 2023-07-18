const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const HttpError = require("../models/http-error");
const connectDB = require("./connectDB");

//API routes
const userRoutes = require("../routes/user-routes");
const postRoutes = require("../routes/post-routes");
const commentRoutes = require("../routes/comment-routes");
const categoryRoutes = require("../routes/category-routes");

const app = express();

app.use(bodyParser.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);

app.use((req, res, next) => {
  next(new HttpError("Could not find this route.", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

module.exports = app;

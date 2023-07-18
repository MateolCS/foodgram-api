const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

categorySchema.plugin(uniqueValidator);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

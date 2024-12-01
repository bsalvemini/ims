const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the category schema
let CategorySchema = new Schema({
  categoryId: {
    type: Number,
    required: true,
  },
  categoryName: {
    type: String,
    unique: true,
    required: [true, "Category name is required"],
    minlength: [3, "Category name must be 3 characters"],
    maxlength: [100, "Category name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
});

module.exports = {
  Category: mongoose.model("Category", CategorySchema)
};
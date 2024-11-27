const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the inventoryItem schema
let inventoryItemSchema = new Schema({
  categoryId: {
    type: Number,
    required: true,
  },
  supplierId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: [true, "Item name is required"],
    minlength: [3, "Item name must be 3 characters"],
    maxlength: [100, "Item name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
  },
  price: {
    type: Decimal128,
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
  InventoryItem: mongoose.model("InventoryItem", inventoryItemSchema)
};

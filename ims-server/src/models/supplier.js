const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the supplier schema
let SupplierSchema = new Schema({
  supplierId: {
    type: Number,
    required: true,
  },
  supplierName: {
    type: String,
    unique: true,
    required: [true, "Supplier name is required"],
    minlength: [3, "Supplier name must be 3 characters"],
    maxlength: [100, "Supplier name cannot exceed 100 characters"],
  },
  contactInformation: {
    type: String,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
  },
  address: {
    type: String,
    maxlength: [200, "Address cannot exceed 200 characters"],
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
  Supplier: mongoose.model("Supplier", SupplierSchema)
};
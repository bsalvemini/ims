const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the supplier schema
let supplierSchema = new Schema({
  supplierId: {
    type: Number,
    required: true,
    unique: true
  },
  supplierName: {
    type: String,
    unique: true,
    required: [true, "Supplier name is required"],
    minlength: [3, "Supplier name must be at least 3 characters"],
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

// Custom validator 
supplierSchema.path('supplierName').validate(function(val) {
  return /^[A-Za-z\s]+$/.test(val); // Only allows letters and spaces 
}, 'Supplier name can only contain letters and spaces');

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = {
  Supplier
};
/**
 * Author: Professor Krasso
 * Date: 7 August 2024
 * File: app.js
 * Description: Application setup. Autogenerated using Express generator.
 */

// require statements
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { notFoundHandler, errorHandler } = require('./error-handler');
const mongoose = require('mongoose');

// Importing the index router
const indexRouter = require('./routes/index');
const allInventoryItemsRouter = require('./routes/inventoryItem/allInventoryItems');
const createInventoryItemRouter = require('./routes/inventoryItem/createInventoryItem');
const categoriesRouter = require('./routes/categories/index');
const suppliersRouter = require('./routes/suppliers/index');

// Variable declaration for the express app
let app = express();

// Mongoose connection

const connectionString = 'mongodb+srv://ims_user:s3cret@bellevueuniversity.lcwc1ht.mongodb.net/?retryWrites=true&w=majority';

const dbName = 'ims';

// Function to connect to database

async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, {dbName: dbName});
    console.log(`Successfully connected to ${dbName} database`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}

// Connect to the database using the connectToDatabase function
connectToDatabase();

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // This allows all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); // Allowed request methods
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allowed headers
  next();
});

// Express app configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing configuration
app.use('/api', indexRouter);
app.use('/api/items', allInventoryItemsRouter);
app.use('/api/create-inventory-item', createInventoryItemRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/suppliers', suppliersRouter);

// Use the error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Export the app
module.exports = app;

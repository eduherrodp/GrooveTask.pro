"use strict";

// app.js
var express = require('express');
var _require = require('express'),
  json = _require.json;
var TaskRoutes = require('./routes/taskRoutes');
var app = express();

/**
 * Configure the Express application with middlewares and routes.
 * @module app
 */

// Middleware to parse incoming request bodies as JSON
app.use(json());

// Use the routes defined in taskRoutes for requests starting with /tasks
app.use('/tasks', TaskRoutes);

// Define the port on which the server will listen for incoming requests
var PORT = process.env.PORT || 3000;

// Start the server and begin listening for incoming requests on the specified port
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});
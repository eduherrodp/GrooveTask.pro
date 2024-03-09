"use strict";

var express = require('express');
var _require = require('./middlewares/jsonMiddleware'),
  jsonMiddleware = _require.jsonMiddleware;
var userRoutes = require('./routes/userRoutes');
var app = express();
var PORT = process.env.PORT || 3000;
app.use(jsonMiddleware);
app.use('/user', userRoutes);
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});
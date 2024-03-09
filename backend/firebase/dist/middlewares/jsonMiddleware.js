"use strict";

var express = require('express');
var jsonMiddleware = express.json();
module.exports = {
  jsonMiddleware: jsonMiddleware
};
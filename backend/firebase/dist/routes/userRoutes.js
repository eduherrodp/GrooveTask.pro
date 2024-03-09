"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controllers/userController'),
  signup = _require.signup;
router.post('/signup', signup);
module.exports = router;
// userRoutes.js
const express = require('express');
const router = express.Router();
const { signup, getUserInfo, token } = require('../controllers/userController');
const { login } = require('../controllers/userController');
const { logout } = require('../controllers/userController');
const { update } = require('../controllers/userController');
const { getToken } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/info/:uid', getUserInfo);
router.post('/getToken', getToken);
router.set('/update', update);

module.exports = router; 
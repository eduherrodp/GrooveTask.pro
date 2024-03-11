// userRoutes.js
const express = require('express');
const router = express.Router();
const { signup, getUserInfo, token } = require('../controllers/userController');
const { login } = require('../controllers/userController');
const { logout } = require('../controllers/userController');
const { saveData } = require('../controllers/userController');
const { getToken } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/info/:uid', getUserInfo);
router.post('/save', saveData);
router.post('/getToken', getToken);

module.exports = router; 
// userRoutes.js
const express = require('express');
const router = express.Router();
const { signup, getUserInfo } = require('../controllers/userController');
const { login } = require('../controllers/userController');
const { logout } = require('../controllers/userController');
const { saveData } = require('../controllers/userController');
const { getToken } = require('../controllers/userController');

// Middleware para manejar las solicitudes OPTIONS
router.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://www.edhrrz.pro');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/info/:uid', getUserInfo);
router.post('/save', saveData);
router.post('/getToken', getToken);

module.exports = router; 
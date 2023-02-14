const express = require('express');
const { registerUser, loginUser, getUser, logout } = require('../Controllers/user.controller');
const { isAuthenticated } = require('../Helper/auth');

const router = express.Router();

router.route('/add-user').post(registerUser)

router.route('/login-user').post(loginUser);

router.route('/logout-user').get(logout);

router.route('/me').get(isAuthenticated, getUser);

module.exports = router;
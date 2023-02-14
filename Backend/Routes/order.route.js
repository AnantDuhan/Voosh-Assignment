const express = require('express');
const { addOrder, myOrders } = require('../Controllers/order.controller');
const { isAuthenticated } = require('../Helper/auth');

const router = express.Router();

router.route('/add-order').post(isAuthenticated, addOrder);

router.route('/get-order').get(isAuthenticated, myOrders);

module.exports = router;

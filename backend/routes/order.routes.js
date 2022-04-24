const express = require('express');
const orderController = require('../controller/order');
const router = express.Router();

 /**
 * Get Order for a user
 * @route GET /orders
 * @group Order
 * @param {Order.model} Order.body.require
 * @returns {Order.model} 201 - Get Order
 */
  router.get('/getall/:id',orderController.getOrderById);

/**
 * Create Order for a user
 * @route GET /orders
 * @group Order
 * @param {Order.model} Order.body.require
 * @returns {Order.model} 201 - Get Order
 */
router.post('/createorder/:userid',orderController.createOrder);
module.exports = router;

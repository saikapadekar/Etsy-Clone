const express = require('express');
const { body } = require('express-validator');
const cartController = require('../controller/cart');

const router = express.Router({ mergeParams: true });

/**
 * Insert to cart
 * @route POST /cart
 * @group Cart
 * @param {Cart.model} Cart.body.require
 * @returns {Cart.model} 201 - Inserted to cart
 */
 router.post('/insert',cartController.insertoCart);

 /**
 * Get Cart for a user
 * @route GET /cart
 * @group Cart
 * @param {Cart.model} Cart.body.require
 * @returns {Cart.model} 201 - Get Cart
 */
  router.get('/getall/:userid',cartController.getCartByUserId);


/**
 * Delete product from cart
 * @route POST /cart
 * @group Cart
 * @param {Cart.model} Cart.body.require
 * @returns {Cart.model} 201 - Deleted from Cart
 */
 router.post('/delete',cartController.deleteFromCart);

module.exports = router;

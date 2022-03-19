const express = require('express');
const { getAllProducts } = require('../controller/product');
const { body } = require('express-validator');
const productController = require('../controller/product');

const router = express.Router({ mergeParams: true });

//todo handle bodyValidators

/**
 * @typedef Product
 * @property {string} name.required
 * @property {string} category.required
 * @property {string} description.required
 * @property {float} price.required
 * @property {integer} qty_available.required
 * @property {integer} shopId.required
 * @property {integer} sold.required//todo handle media
 */

/**
 * Create/Insert Product for a shop
 * @route POST /products
 * @group Products
 * @param {string} authorization.header.require//todo handle shopId by path
 * @param {Product.model} Product.body.require
 * @returns {Product.model} 201 - Created Product
 */
 router.post('/insert',productController.createProductForShop);

/**
 * Get list of Products for shop
 * @route GET /products
 * @group Products
 * @param {string} authorization.header.require//todo handle shopid from path
 * @param {integer} page.query.require
 * @param {integer} limit.query.require
 * @returns {Array.<Product>} 200 - List of dishes info
 */
 router.get('/getall', productController.getProductsForShop);

 /**
 * Delete Product by ID
 * @route DELETE /products
 * @group Products
 * @param {string} authorization.header.require//todo handle pdt_id shop_id
 * @returns {null} 200 - Delete Product
 */
router.delete('/delete/:productID', productController.deleteProductInShop);

/**
 * Update Product by ID
 * @route PUT /products
 * @group Products
 * @param {string} authorization.header.require
 * @param {integer} dishID.path.require
 * @param {Product.model} Product.body.require
 * @returns {Product.model} 200 - Updated Product
 */
 router.put('/update/:productID', productController.updateProductInShop);

module.exports = router;

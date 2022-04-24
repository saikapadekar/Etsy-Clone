/* eslint-disable newline-per-chained-call */
const express = require('express');
const { body } = require('express-validator');
const shopController = require('../controller/shop');

const router = express.Router();

/**
 * @typedef Shop
 * @property {integer} id.required
 * @property {string} name.required
 */


 const bodyValidators = () => [
    // body('id').exists().isInt().not().isIn([0]),
    body('name').exists().isString(),
    // body('media').optional({ nullable: true }).isArray(),//todo handle media
  ];

const [, ...updateValidators] = bodyValidators();


/**
 * Create a Shop
 * @route POST /shops
 * @group Shops
 * @param {string} authorization.header.require
 * @param {Shop.model} Shop.body.require
 * @returns {Shop.model} 201 - Created Shop
 */
 router.post('/createshop', ...bodyValidators(), shopController.createShop);

/**
 * Get Shop by ID
 * @route GET /shops/{id}
 * @group Shops
 * @param {string} authorization.header.require
 * @param {integer} id.path.require
 * @returns {Shop.model} 200 - Shop for given ID
 */
 router.get('/:id', shopController.getShopByID);

 /**
 * Get list of Shops
 * @route GET /shops/all
 * @group Shops
 * @param {string} authorization.header.require
 * @returns {Array.<Shop>} 200 - 
 */
router.get('/all', shopController.allShops);

/**
 * Get Shop by Name
 * @route GET /shops/{name}
 * @group Shops
 * @param {string} authorization.header.require
 * @param {string} name.path.require
 * @returns {Shop.model} 200 - Shop for given name
 */
 router.get('/name/:name', shopController.getShopByName);


 /**
 * Get Shop by Name
 * @route GET /shops/{name}
 * @group Shops
 * @param {string} authorization.header.require
 * @param {string} name.path.require
 * @returns {Shop.model} 200 - Shop for given name
 */
  router.get('/nametwo/:name', shopController.getShopByNameTwo);

  /**
 * Get Shop by UserID
 * @route GET /shops/user/{userid}
 * @group Shops
 * @param {string} authorization.header.require
 * @param {integer} userid.path.require
 * @returns {Shop.model} 200 - Shop for given userid
 */
 router.get('/user/:userid', shopController.getShopByUserID);


 module.exports = router;
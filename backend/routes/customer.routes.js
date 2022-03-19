
const express = require('express');
const { body } = require('express-validator');
const customerController = require('../controller/customer');
const router = express.Router();

/**
 * @typedef Customer
 * @property {integer} id.required
 * @property {string} name.required
 * @property {string} about
 * @property {string} gender
 * @property {string} dob//todo change datatype
 * @property {string} city.required
 * @property {string} state.required
 * @property {string} country.required
 * @property {string} contact_no.required
 * @property {string} address.required//todo media_id
 */

const bodyValidators = () => [
  body('id').exists().isInt().not().isIn([0]),
  body('name').exists().isString().not().isIn(['']),
  body('about').isString(),
  body('gender').isString(),
  body('dob').isString(),//todo change datatype
  body('city').exists().isString().not().isIn(['']),
  body('state').exists().isString().not().isIn(['']),
  body('country').exists().isString().not().isIn(['']),
  body('contact_no').exists().isString(),//todo change datatype
  body('address').exists().isString().not().isIn(['']),
  // body('mediumId').optional({ nullable: true }).isInt().not().isIn([0]),//todo
];

const [, ...updateValidators] = bodyValidators();

/**
 * Create a Customer
 * @route POST /customers
 * @group Customers
 * @param {string} authorization.header.require
 * @param {Customer.model} Customer.body.require
 * @returns {Customer.model} 201 - Created Customer
 */
router.post('/createcustomer', ...bodyValidators(), customerController.createCustomer);

/**
 * Get Customer by ID
 * @route GET /customers/{id}
 * @group Customers
 * @param {string} authorization.header.require
 * @param {integer} id.path.require
 * @returns {Customer.model} 200 - Customer for given ID
 */
 router.get('/:id', customerController.getCustomerByID);


 /**
 * Update Customer by ID
 * @route PUT /customers/{id}
 * @group Customers
 * @param {string} authorization.header.require
 * @param {integer} id.path.require
 * @param {Customer.model} Customer.body.require
 * @returns {Customer.model} 200 - Updated Customer
 */
router.put('/:id', ...updateValidators, customerController.updateCustomerByID);


module.exports = router;

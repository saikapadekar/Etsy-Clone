
const express = require('express');
const { body } = require('express-validator');
const customerController = require('../controllers/customer');
const favouriteRouter = require('./favourite.routes');
const addressRouter = require('./address.routes');

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
 * @property {integer} mediumId
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
  body('contact_no').exists().isString().not().isIn(['']),
  body('address').exists().isString().not().isIn(['']),
  body('mediumId').optional({ nullable: true }).isInt().not().isIn([0]),
];

const [, ...updateValidators] = bodyValidators();

router.use('/favourites', favouriteRouter);
router.use('/addresses', addressRouter);

/**
 * Get list of Customers
 * @route GET /customers
 * @group Customers
 * @param {string} authorization.header.require
 * @param {integer} page.query.require
 * @param {integer} limit.query.require
 * @returns {Array.<Customer>} 200 - List of customer info
 */
router.get('/', customerController.getAllCustomers);

/**
 * Create a Customer
 * @route POST /customers
 * @group Customers
 * @param {string} authorization.header.require
 * @param {Customer.model} Customer.body.require
 * @returns {Customer.model} 201 - Created Customer
 */
router.post('/', ...bodyValidators(), customerController.createCustomer);

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

/**
 * Delete Customer by ID
 * @route DELETE /customers/{id}
 * @group Customers
 * @param {string} authorization.header.require
 * @param {integer} id.path.require
 * @returns {null} 200 - Delete Customer
 */
router.delete('/:id', customerController.deleteCustomerByID);

module.exports = router;
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const {
  Customer, Media, Address, Favourite,
} = require('../model');
const errors = require('../util/errors');

//To get details of loggedin customer
const getCustomerByID = async (req, res) => {
  const { id } = req.params;
  if (!id || id === 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  if (id != req.headers.user) {
    res.status(401).json(errors.unauthorized);
    return;
  }

  const customer = await Customer.findOne({ where: { id }, include: [Media, Address, Favourite] });
  if (!customer) {
    res.status(404).send(errors.notFound);
    return;
  }

  res.status(200).json(customer);
};

const createCustomer = async (req, res) => {
  const { user } = req.headers;
  if (user !== req.body.id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'customer.id in body should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const customer = req.body;
  try {
    const createdCustomer = await Customer.create(customer);
    const result = await Customer.findOne({ where: { id: createdCustomer.id }, include: Media });

    res.status(201).json(result);
    return;
  } catch (err) {
    console.error(err);
    if (err.original) {
      res.status(500).json({ status: 500, message: err.original.sqlMessage });
    } else {
      res.status(500).json(errors.serverError);
    }
  }
};

const updateCustomerByID = async (req, res) => {
  const { user } = req.headers;
  if (user !== req.body.id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'customer.id in body should be same as logged in user',
    });
    return;
  }
  const { id } = req.params;
  if (!id || id == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const customer = req.body;

  const dbRes = await Customer.findOne({ where: { id } });
  if (!dbRes) {
    res.status(404).json(errors.notFound);
    return;
  }

  try {
    dbRes.name = customer.name;
    dbRes.about = customer.about;
    dbRes.gender = customer.gender;
    dbRes.dob = customer.dob;
    dbRes.city = customer.city;
    dbRes.state = customer.state;
    dbRes.country = customer.country;
    dbRes.contact_no = customer.contact_no;
    dbRes.address = customer.address;
    if (customer.mediumId != 0) {
      dbRes.mediumId = customer.mediumId;
    }

    const updatedRes = await dbRes.save();
    const result = await Customer.findOne({ where: { id: updatedRes.id }, include: Media });

    res.status(200).json(result);
    return;
  } catch (err) {
    console.error(err);
    if (err.original) {
      res.status(500).json({ status: 500, message: err.original.sqlMessage });
    } else {
      res.status(500).json(errors.serverError);
    }
  }
};

const deleteCustomerByID = async (req, res) => {
  const { id } = req.params;
  if (!id || id == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const customer = await Customer.findOne({ where: { id } });
  if (!customer) {
    res.status(401).send(errors.notFound);
    return;
  }

  try {
    await customer.destroy();
    res.status(200).send(null);
    return;
  } catch (err) {
    console.error(err);
    if (err.original) {
      res.status(500).json({ status: 500, message: err.original.sqlMessage });
    } else {
      res.status(500).json(errors.serverError);
    }
  }
};

module.exports = {
  getAllCustomers,
  getCustomerByID,
  createCustomer,
  updateCustomerByID,
  deleteCustomerByID,
};
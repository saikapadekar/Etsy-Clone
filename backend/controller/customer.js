const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const {  Buyer} = require('../model');
const errors = require('../util/errors');

const createCustomer = async (req, res) => {
  const { user } = req.headers;

  console.log(`Creating customer with data: `,req.body);

  console.log(req.headers);//todo handle this-logged in user
//   user=1;
//   if (user !== req.body.id) {
//     res.status(400).json({
//       ...errors.badRequest,
//       message: 'customer.id in body should be same as logged in user',
//     });
//     return;
//   }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const customer = req.body;
  try {
    const createdCustomer = await Buyer.create(customer);
    const result = await Buyer.findOne( { _id: createdCustomer.id } );

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

const CustomerByEmail = async (req, res) => {


  console.log(`Fetching customer with email: `,req.body);
  const {email}=req.body;


  try {
    const result = await Buyer.findOne( { email: email } );

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

const getCustomerByID = async (req, res) => {
    let { id } = req.params;
    console.log(`Inside getCustomerByID, data: `,req.params)
    if(typeof(id)=='undefined')
    {
      console.log("Got undefined customer_id")
        id=1;
    }
    else{
      console.log("Fetching customer with id:"+id);
    }
    
    console.log(req.headers.user);//undefined
    if (!id || id === 0) {
      res.status(400).json(errors.badRequest);
      return;
    }
  
    // if (id != req.headers.user) {//todo handle logged-in user
    //   res.status(401).json(errors.unauthorized);
    //   return;
    // }
  
    const customer = await Buyer.findOne({ _id:  id  });//todo handle media
    if (!customer) {
      res.status(404).send(errors.notFound);
      return;
    }
  
    res.status(200).json(customer);
  };

  const getCustomerByEmail = async (req, res) => {
    const { email } = req.params;
    console.log("Fetching customer with email:"+email);
    // console.log(req.headers.user);//undefined
    if (!email || email === '') {
      res.status(400).json(errors.badRequest);
      return;
    }
  
  
    const customer = await Buyer.findOne({ email:  email  });//todo handle media
    console.log(`Printing customer if found:`,customer)
    if (!customer) {
      res.status(404).send(errors.notFound);
      return;
    }
  
    res.status(200).json(customer);
  };

  const updateCustomerByID = async (req, res) => {
    const { user } = req.headers;
    // if (user !== req.body.id) {
    //   res.status(400).json({
    //     ...errors.badRequest,
    //     message: 'customer.id in body should be same as logged in user',
    //   });
    //   return;
    // }
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
  
    const dbRes = await Buyer.findOne({ _id:  id  });
    if (!dbRes) {
      res.status(404).json(errors.notFound);
      return;
    }
  
    try {
      dbRes.userid = customer.userid;
      dbRes.url = customer.url;
      dbRes.name = customer.name;
      dbRes.about = customer.about;
      dbRes.gender = customer.gender;
      dbRes.dob = customer.dob;
      dbRes.city = customer.city;
      dbRes.state = customer.state;
      dbRes.country = customer.country;
      dbRes.contact_no = customer.contact_no;
      dbRes.address = customer.address;//todo handle media
  
      const updatedRes = await dbRes.save();
      const result = await Buyer.findOne({ id: updatedRes.id } );//handle media
  
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

module.exports = {
  createCustomer,
  getCustomerByID,
  updateCustomerByID,
  getCustomerByEmail,
  CustomerByEmail
};

/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { Shop } = require("../model");
const errors = require("../util/errors");
const getPagination = require("../util/pagination");

const createShop = async (req, res) => {
  console.log(`inside createShop backend`);
  console.log(`printing req data`, JSON.stringify(req.params));
  const { user } = req.headers; //todo handle
  // if (user !== req.body.id) {
  //   res.status(400).json({
  //     ...errors.badRequest,
  //     message: 'shop.id in body should be same as logged in user',
  //   });
  //   return;
  // }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const shop = req.body;

  // const t = await global.DB.transaction();
  try {
    const createdShop = await Shop.create(shop);

    const result = await Shop.findOne(
      { _id: createdShop.id  } //todo handle media
    );

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

const getShopByID = async (req, res) => {
  console.log(`inside getShopByID,id: `, req.params);
  const { id } = req.params;
  if (!id || id == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const shop = await Shop.findOne({  _id:  id });
  if (!shop) {
    res.status(404).send(errors.notFound);
    return;
  }

  res.status(200).json(shop);
};

const allShops = async (req, res) => {
  const shops = await Shop.find();
  res.status(200).json(shops);
};

const getShopByName = async (req, res) => {
  console.log(`inside getShopByName, name: `, req.params);
  const { name } = req.params;
  // if (!id || id == 0) {
  //   res.status(400).json(errors.badRequest);
  //   return;
  // }

  const shop = await Shop.findOne({ name:  name   });
  if (shop) {
    res.status(404).json(shop);
    return;
  }
  res.status(200).send();
  return;
};

const getShopByNameTwo = async (req, res) => {
  console.log(`inside getShopByNameTwo, name: `, req.params);
  const { name } = req.params;
  // if (!id || id == 0) {
  //   res.status(400).json(errors.badRequest);
  //   return;
  // }

  const shop = await Shop.findOne({ name:  name  });
  if (shop) {
    res.status(200).json(shop);
    return;
  }
  res.status(404).send();
  return;
};

const getShopByUserID = async (req, res) => {
  console.log(`inside getShopByID,id: `, req.params);
  const { userid } = req.params;
  if (!userid || userid == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const shop = await Shop.findOne({  userid:  userid });
  if (!shop) {
    res.status(404).send(errors.notFound);
    return;
  }

  res.status(200).json(shop);
};


module.exports = {
  createShop,
  getShopByID,
  allShops,
  getShopByName,
  getShopByNameTwo,
  getShopByUserID
};
const { Product, Shop } = require("../model");
const { validationResult } = require("express-validator");
const errors = require("../util/errors");
const getPagination = require("../util/pagination");

const getAllProducts = async (req, res) => {
  console.log(`inside getAllProducts`);
  const products = await Product.findAll();
  res.status(200).json(products);
};

const createProductForShop = async (req, res) => {
  console.log(`inside createProductForShop backend`);
  console.log(`printing req data`, req.body);
  console.log(req.params);
  let shopID = req.body.shopId;
  if (typeof shopID != "undefined") {
    console.log(`Got shopID: `, shopID);
  } else {
    shopID = 1;
  }
  //todo handle
  // if (!shopID || shopID == 0) {
  //   res.status(400).json(errors.badRequest);
  //   return;
  // }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const shop = await Shop.findOne({ where: { id: shopID } });
  if (!shop) {
    res.status(404).json({ ...errors.notFound, message: "shop not found" });
    return;
  }

  const product = req.body;

  const t = await global.DB.transaction();
  try {
    product.shopId = shopID;
    const createdRes = await Product.create(product, { transaction: t });

    //   if (product.media && product.media.length > 0) {
    //     await createdRes.setMedia(product.media, { transaction: t });
    //   }

    await t.commit();

    const result = await Product.findOne(
      { where: { id: createdRes.id } } //todo handle media
    );
    res.status(201).json(result);
    return;
  } catch (err) {
    await t.rollback();
    console.error(err);
    if (err.original) {
      res.status(500).json({ status: 500, message: err.original.sqlMessage });
    } else {
      res.status(500).json(errors.serverError);
    }
  }
};
const getProductsForShop = async (req, res) => {
  console.log(`Inside getProductsForShop, data: `, req.body);
  let { shopID } = req.params;
  if (typeof shopID == "undefined") {
    shopID = 1;
  }

  if (!shopID || shopID == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const { limit, offset } = getPagination(req.query.page, req.query.limit);

  const productCount = await Product.count({ where: { shopId: shopID } });
  const products = await Product.findAll({
    where: { shopId: shopID },
    limit,
    offset,
  });

  res.status(200).json({ total: productCount, nodes: products });
};

const getProductsById = async (req, res) => {
  console.log(`Inside getProductsById, data: `, req.params);
  let { id } = req.params;
  // if (typeof id == "undefined") {
  //   shopID = 1;
  // }

  if (!id || id == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const product = await Product.findOne({
    where: { id: id }
  });

  res.status(200).json(product);
};
const deleteProductInShop = async (req, res) => {
  const shopID = 1;
  if (!shopID || shopID == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const { productID } = req.params;
  if (!productID || productID == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const product = await Product.findOne({
    where: { id: productID, shopId: shopID },
  });
  if (!product) {
    res
      .status(404)
      .json({ ...errors.notFound, message: "product not found for shop" });
    return;
  }

  try {
    await product.destroy();
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

const updateProductInShop = async (req, res) => {
  const shopID = 1; //todo
  if (!shopID || shopID == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const { productID } = req.params;
  if (!productID || productID == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const dbRes = await Product.findOne({
    where: { id: productID, shopId: shopID }, //todo Media
  });
  if (!dbRes) {
    res
      .status(404)
      .json({ ...errors.notFound, message: "product not found for shop" });
    return;
  }

  const product = req.body;

  const t = await global.DB.transaction();
  try {
    dbRes.name = product.name;
    dbRes.category = product.category;
    dbRes.description = product.description;
    dbRes.price = product.price;
    dbRes.qty_available = product.qty_available;
    dbRes.shopId = product.shopId;
    dbRes.sold = product.sold;

    const updatedRes = await dbRes.save({ transaction: t });

    //   if (product.media && product.media.length > 0) {
    //     await updatedRes.setMedia(product.media, { transaction: t });
    //   } else {
    //     await updatedRes.removeMedia(dbRes.media, { transaction: t });
    //   }

    await t.commit();

    const result = await Product.findOne(
      { where: { id: updatedRes.id } }, //todo handle Media
      { transaction: t }
    );
    res.status(200).json(result);
    return;
  } catch (err) {
    await t.rollback();
    console.error(err);
    if (err.original) {
      res.status(500).json({ status: 500, message: err.original.sqlMessage });
    } else {
      res.status(500).json(errors.serverError);
    }
  }
};
//todo get products by pricerange
module.exports = {
  getAllProducts,
  createProductForShop,
  getProductsForShop,
  deleteProductInShop,
  updateProductInShop,
  getProductsById
};

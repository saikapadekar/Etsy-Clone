const express = require('express');
const { getAllProducts } = require('../controller/product');

const router = express.Router();

router.get('/', getAllProducts);


module.exports = router;

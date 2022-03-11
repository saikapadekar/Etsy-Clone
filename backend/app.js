/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const {getAuthMiddleware} = require('u-server-utils');
const validate = require('./util/authValidator')

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes')

const app = express();

const expressSwagger = require('express-swagger-generator')(app);

// all middlewares
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Max-Age', 1728000);
  next();
});

const validationMid = getAuthMiddleware(validate);

app.use('/auth', authRoutes);
app.use('/products', validationMid, productRoutes);

module.exports = app;

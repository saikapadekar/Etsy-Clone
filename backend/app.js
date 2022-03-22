/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const {getAuthMiddleware, getAccessMiddleware} = require('u-server-utils');
const validate = require('./util/authValidator')

const authRoutes = require('./routes/auth.routes');
const customerRouter = require('./routes/customer.routes');
const shopRouter = require('./routes/shop.routes');
const productRouter = require('./routes/product.routes');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);

// all middlewaress
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Max-Age', 1728000);
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const validationMid = getAuthMiddleware(validate);
app.use('/auth', authRoutes);
app.use('/customers', customerRouter);
app.use('/shops', shopRouter);
app.use('/products',productRouter);


module.exports = app;

/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const { Types } = require('mongoose');
const { getPagination } = require('u-server-utils');
const { Order, Cart } = require('../model');
const errors = require('../util/errors');


const getOrderById = async (req, res) => {
    const { id } = req.params;  
    console.log(`Backend: inside getOrderById`, id)
    // console.log(`Backend: inside getOrderById printing req`, req)


    
    console.log(`inside getOrderById: `,id);
    const order = await Order.findOne({ _id: id });

    if (!order) {
        res.status(404).json(errors.notFound);
        return;
      }

    res.status(200).json(order);
  
  };

const createOrder = async (req, res) => {

  const { userid } = req.params;
  console.log(`Backend: inside createOrder`, userid)

  const cartItems = await Cart.find({userid: userid});
  console.log(`Printing cartItems`,cartItems)

  if (!cartItems || cartItems.length === 0) {
    res.status(404).json({ ...errors.notFound, message: 'you have no items in cart' });
    return;
  }

  let orderAmount = 0;
    cartItems.forEach((item) => {
      orderAmount += item.price * item.qty;
    });

    const orderItems = cartItems.map((item) => ({
        url:item.url,
        shopId: item.shopId,
        productId: item.productId,
        name: item.name,
        shopname:item.shopname,
        price: item.price,
        qty: item.qty,
        isGift:item.isGift,
        note: item.note,
      }));

      var order={
        userid:userid,
        date: '', //to handle
        orderitems: orderItems,
        amount: orderAmount  
      }
      try {
        const createdOrder = await Order.create(order);

        const result = await Order.findOne( { _id: createdOrder.id } );

        res.status(201).json(result);
        return;
      }
      catch(err){
        res.status(500).json(errors.serverError);
      }

};

const getOrdersByUserId = async (req, res) => {
  const {userid}=req.params;
  console.log(`Backend: getOrdersByUserId for user:`, userid)

  const { limit, offset } = getPagination(req.query.page, req.query.limit);
  // if(!limit)
  // {
  //   limit=10;
  // }
  // if(!offset)
  // {
  //   offset=0;
  // }
  console.log(`limit:`, limit)
  console.log(`offset:`, offset)

  const orders = await Order.find({userid}).sort({ date: -1 }).skip(offset).limit(limit);

  res.status(200).json(orders);
  return;

};


module.exports = {
    getOrderById,
    createOrder,
    getOrdersByUserId
};

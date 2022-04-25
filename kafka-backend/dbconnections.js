const { mongoose, Schema, model, Types } = require('mongoose');


const getConnection = () => {
  const Conn = mongoose.createConnection(global.gConfig.database_conn);
  Conn.set('debug', true);

  const UserSchema = new Schema({
    email: String,
    password: String,
    role: {
      type: String,
      enum: ['customer'],
    },
  });

  const BuyerSchema = new Schema({
    userid: String,
    url: String,
    name: String,
    email: String,
    about: String,
    gender: String,
    dob: Date,
    city: String,
    state: String,
    country: String,
    contact_no: String,
    address: String
  });

  const ShopSchema = new Schema({
    userid: String,
    url: String,
    name: String,
    owner_details: String
  });

  const ProductSchema = new Schema({
    name: String,
    url: String,
    category: String,
    description: String,
    price: Number,
    qty_available: Number,
    shopId: String,
    sold: Number
  });

  const FavSchema = new Schema({
    userid: String,
    shopId: String,
    productId: {
      type: String,
      unique: true
    },
    name: String,
    url: String,
    category: String,
    description: String,
    price: Number,
    qty_available: Number,
  });

  const CartSchema = new Schema({
    userid: String,
    url: '',
    shopId: String,
    productId: {
      type: String,
      unique: true
    },
    name: String,
    shopname: String,
    price: Number,
    qty: Number,
    isGift: Boolean,
    note: String
  });
  const OrderItemSchema = new Schema({
    url: String,
    shopId: String,
    productId: String,
    name: String,
    shopname: String,
    price: Number,
    qty: Number,
    isGift: Boolean,
    note: String
  });

  const OrderSchema = new Schema({
    userid: String,
    date: Date,
    orderitems: [OrderItemSchema],
    amount: Number
  });

  const User = model('users', UserSchema);
  const Buyer = model('customers', BuyerSchema);
  const Shop = model('shops', ShopSchema);
  const Product = model('products', ProductSchema);
  const Favorite = model('favorites', FavSchema);
  const Cart = model('cart', CartSchema);
  const Order = model('orders', OrderSchema);


  return { Conn, User, Buyer, Shop, Product, Favorite, Cart, Order };
};

module.exports = {
  getConnection,
};

import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email:  String, // String is shorthand for {type: String}
    password: String,
    role: {
        type: String,
        enum: ['customer'],
      },
  });

const productSchema = new Schema({
    name:  String, 
    url: String,
    category:   String,
    description:   String ,
    price:Number,
    qty_available:Number,
    shopId: Number,
    sold:Number
});


const buyerSchema = new Schema({
    name:  String, 
    url: String,
    email:  String,
    about: String,
    gender:String,
    dob: Date,
    city:  String,
    state: String,
    country:String,
    contact_no:Number,
    address:String
});


const shopSchema=new Schema({
    name:  String, 
    url: String,
    owner_details:String
});


const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Buyer = mongoose.model('Buyer', buyerSchema);
const Shop = mongoose.model('Shop', shopSchema);

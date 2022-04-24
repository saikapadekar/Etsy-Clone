const { validationResult } = require("express-validator");
const { Favorite,Shop,User,Buyer,Product,Cart } = require("../model");
const errors = require("../util/errors");
const getPagination = require("../util/pagination");

const insertoCart = async (req, res) => {
    const cart = req.body;
    const{userid,shopId,productId}=cart;
    console.log(`Backend: Inside insertoCart req: `, cart)

    const user = await User.findOne({ _id: userid });
    if (!user) {
        res.status(404).json({ ...errors.notFound, message: "user not found" });
        return;
    }

    const shop = await Shop.findOne({ _id: shopId });
    if (!shop) {
        res.status(404).json({ ...errors.notFound, message: "shop not found" });
        return;
    }

    const product = await Product.findOne({ _id: productId });
    if (!product) {
        res.status(404).json({ ...errors.notFound, message: "product not found" });
        return;
    }

    try {

        const createdCart = await Cart.create(cart);
        const result = await Cart.findOne( { _id: createdCart.id } );
    
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


const getCartByUserId = async (req, res) => 
{
    const { userid } = req.params;  
    console.log(`inside getCartByUserId: `,userid);
    const cart = await Cart.find({userid: userid});
    res.status(200).json(cart);
};

const deleteFromCart = async (req, res) => 
    {
        const { userid,productId } = req.body;

        console.log(`inside deleteFromCart: `,req.body);
        const deleted=await Cart.deleteOne({userid: userid, productId:productId})
        if (deleted) {
        res.status(200).send();
        return;
        }
        res.status(404).send();
        return;
    };


const updateCartProduct = async (req, res) => {

    const cart = req.body;

    console.log(`Backend: Inside updateCartProduct req: `, cart)

    const {userid,productId,shopId}=cart;
  
    const dbRes = await Cart.findOne({ productId:  productId  });
    if (!dbRes) {
      res.status(404).json(errors.notFound);
      return;
    }
  
    try {
      dbRes.userid = cart.userid;
      dbRes.name = cart.name;
      dbRes.shopId = cart.shopId;
      dbRes.productId = cart.productId;
      dbRes.price = cart.price;
      dbRes.qty = cart.qty;
      dbRes.isGift = cart.isGift;
      dbRes.note = cart.note;
  
      const updatedRes = await dbRes.save();
      const result = await Cart.findOne({ productId:  productId, userid:userid } );
  
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
    insertoCart,
    getCartByUserId,
    deleteFromCart,
    updateCartProduct
  };
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
const { validationResult } = require("express-validator");
const { Favorite,Shop,User,Buyer,Product } = require("../model");
const errors = require("../util/errors");
const getPagination = require("../util/pagination");

const insertFavorite = async (req, res) => {
    const favorite = req.body;
    const{userid,shopId,productId}=favorite;
    console.log(`Backend: Inside insertFavorite req: `, favorite)

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

        const createdFav = await Favorite.create(favorite);
        const result = await Favorite.findOne( { _id: createdFav.id } );
    
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

const getFavoriteByUserId = async (req, res) => {

  // console.log(`Inside getFavoriteByUserId, data: `, req.body);
  // // const { userid } = req.params;

  // if (!userid || userid == 0) {
  //   res.status(400).json(errors.badRequest);
  //   return;
  // }

  // const { limit, offset } = getPagination(req.query.page, req.query.limit);

  // const favoriteCount = await Favorite.count({ userid: userid } );
  // // const favorites = await Favorite.find({ userid: userid ,    limit,    offset,  });

  // res.status(200).json({ total: favoriteCount, nodes: favorites });

  const { userid } = req.params;

  console.log(`inside getFavoriteByUserId: `,userid);
  const favorites = await Favorite.find({userid: userid});
  res.status(200).json(favorites);
};

const checkFavProdForUser = async (req, res) => {
  const { userid,productId } = req.body;

  console.log(`inside getFavoriteByUserId: `,userid);
  const favorites = await Favorite.find({userid: userid, productId:productId});
  if (favorites) {
    res.status(200).json(favorites);
    return;
  }
  res.status(404).send();
  return;
};
module.exports = {
    insertFavorite,
    getFavoriteByUserId,
    checkFavProdForUser
  };
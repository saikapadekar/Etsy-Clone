const express = require('express');
const { body } = require('express-validator');
const favoriteController = require('../controller/favorite');

const router = express.Router({ mergeParams: true });

/**
 * Insert Favorite for a user
 * @route POST /favorites
 * @group Favorites
 * @param {Favorite.model} Favorite.body.require
 * @returns {Favorite.model} 201 - Created Favorite
 */
 router.post('/insert',favoriteController.insertFavorite);

 /**
 * Get Favorite for a user
 * @route GET /favorites
 * @group Favorites
 * @param {Favorite.model} Favorite.body.require
 * @returns {Favorite.model} 201 - Get Favorite
 */
  router.get('/getall/:userid',favoriteController.getFavoriteByUserId);

/**
 * Check Favorite for a user,product
 * @route POST /favorites
 * @group Favorites
 * @param {Favorite.model} Favorite.body.require
 * @returns {Favorite.model} 201 - Created Favorite
 */
  router.get('/checkfav',favoriteController.checkFavProdForUser);
  

module.exports = router;

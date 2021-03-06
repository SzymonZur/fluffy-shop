const { FavoriteProducts } = require("../models/favoriteProducts");
const express = require("express");
const router = express.Router();

// getting a res if it is favorite products for actual user and populate with data product
router.get(`/get/favlist/:userid`, async (req, res) => {
  const favoriteProductsList = await FavoriteProducts.find({
    user: req.params.userid
  }).populate('product')

  if (!favoriteProductsList) {
    res.status(500).json({ success: false });
  }

  res.send(favoriteProductsList)
});

// getting a res if it is favorite products for actual user
router.get(`/get/favlist/:userid/:productid`, async (req, res) => {
  const favoriteProductsList = await FavoriteProducts.findOne({
    user: req.params.userid,
    product: req.params.productid,
  });

  if (!favoriteProductsList) {
    return res.status(200).send(false);
  }

  res.send(true)
});

// adding new favorite product to list
router.post("/", async (req, res) => {
  let favoriteProducts = new FavoriteProducts({
    product: req.body.productId,
    user: req.body.userId,
  });
  favoriteProducts = await favoriteProducts.save();

  if (!favoriteProducts) {
    res.status(400).send("The favorite product cannot be added!");
  }
  res.send(favoriteProducts);
});

// deleting product from favorites products for actual user
router.delete(`/removeFavorite/:userid/:productid`, async (req, res) => {
  const favoriteProductsList = await FavoriteProducts.findOne({
    user: req.params.userid,
    product: req.params.productid,
  });

  if (!favoriteProductsList) {
    res.status(500).json({ success: false });
  }

  favoriteProductsList.deleteOne();
});

module.exports = router;

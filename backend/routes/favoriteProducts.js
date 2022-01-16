const { FavoriteProducts } = require("../models/favoriteProducts");
const express = require("express");
const router = express.Router();

// getting a res if it is favorite products for actual user
router.get(`/get/favlist/:userid/:productid`, async (req, res) => {
  const favoriteProductsList = await FavoriteProducts.findOne({
    user: req.params.userid,
    product: req.params.productid,
  });

  if (!favoriteProductsList) {
    res.send(false)
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

// getting a list of favorites products for actual user
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

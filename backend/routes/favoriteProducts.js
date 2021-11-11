const { FavoriteProducts } = require("../models/favoriteProducts");
const express = require("express");
const router = express.Router();

// getting a list of favorites products for actual user
router.get(`/get/favlist/:userid`, async (req, res) => {
  const favoriteProductsList = await FavoriteProducts.find({
    user: req.params.userid,
  });

  if (!favoriteProductsList) {
    res.status(500).json({ success: false });
  }
  res.send(favoriteProductsList);
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

module.exports = router;

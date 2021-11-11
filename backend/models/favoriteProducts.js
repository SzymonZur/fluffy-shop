const mongoose = require("mongoose");

const favoriteProductsSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

exports.FavoriteProducts = mongoose.model("FavoriteProducts", favoriteProductsSchema);

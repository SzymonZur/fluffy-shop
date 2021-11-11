const {FavoriteProducts} = require('../models/favoriteProducts');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const favoriteProductsList = await FavoriteProducts.find();

    if(!favoriteProductsList) {
        res.status(500).json({success: false})
    } 
    res.send(favoriteProductsList);
})

module.exports =router;
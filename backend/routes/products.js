const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const productList = await Product.find();

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})

router.post("/", async (req, res) => {
    let newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
    });
    newProduct = await newProduct.save();
  
    if (!newProduct) {
      res.status(400).send("The favorite product cannot be added!");
    }
    res.send(newProduct);
  });

module.exports =router;
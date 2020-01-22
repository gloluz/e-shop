const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Department = require("../models/Department");

const router = express.Router();

// Create:
router.post("/product/create", async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      category: req.fields.category
    });

    await newProduct.save();

    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Read:
router.get("/product", async (req, res) => {
  try {
    let products = await Product.find().populate("category");

    if (req.query.category && req.query.title) {
      const regexp = new RegExp(req.query.title, "i");
      const searchProduct = await Product.find({ title: regexp });

      return res.json(searchProduct);
    }

    if (req.query.priceMin >= 100) {
      products = await Product.find({ price: { $gte: 100 } });

      return res.json(products);
    }

    if (req.query.PriceMax <= 500 && req.query.category) {
      products = await Product.find({ price: { $lte: 500 } });

      return res.json(products);
    }

    // if (products.length > 0) {
    //   return res.json(products);
    // } else {
    //   return res.status(400).json({ message: "Product not found" });
    // }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

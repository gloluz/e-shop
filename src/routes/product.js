const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Create:
router.post('/product/create', async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      category: req.fields.category,
    });

    await newProduct.save();

    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Read:
router.get('/product', async (req, res) => {
  try {
    const query = {};

    if (req.query.title) {
      query.title = new RegExp(req.query.title, 'i');
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.priceMin) {
      query.price = {};
      query.price.$gte = req.query.priceMin;
    }

    if (req.query.priceMax) {
      if (query.price) {
        query.price.$lte = req.query.priceMax;
      } else {
        query.price = { $lte: req.query.priceMax };
      }
    }

    const search = Product.find(query).populate('category');

    if (req.query.sort === 'price-asc') {
      search.sort({ price: 1 });
    } else if (req.query.sort === 'price-desc') {
      search.sort({ price: -1 });
    }

    const products = await search;

    if (products.length > 0) {
      return res.json(products);
    } else {
      return res.status(400).json({ message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update:
router.post('/product/update', async (req, res) => {
  try {
    const productToUpdate = await Product.findById(req.query.id);

    if (!productToUpdate) {
      return res.status(400).json({ message: 'Product not found' });
    } else {
      productToUpdate.title = req.fields.title;
      productToUpdate.description = req.fields.description;
      productToUpdate.price = req.fields.price;
      productToUpdate.category = req.fields.category;

      await productToUpdate.save();

      return res.json(productToUpdate);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Delete:
router.post('/product/delete', async (req, res) => {
  try {
    const productToDelete = await Product.findById(req.query.id);

    if (productToDelete) {
      productToDelete.remove();

      return res.json({ message: 'Product removed' });
    } else {
      return res.status(400).json({ message: 'No product found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

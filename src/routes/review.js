const express = require('express');
const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

// Create:
router.post('/review/create', async (req, res) => {
  try {
    if (!req.fields.product || typeof req.fields.rating !== 'number' || !req.fields.comment || !req.fields.user) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const newReview = new Review({
      product: req.fields.product,
      rating: req.fields.rating,
      comment: req.fields.comment,
      user: req.fields.user,
    });

    const user = await User.findOne({ _id: req.fields.user });

    if (!user) {
      return res.status(400).json({ message: 'The specified user does not exist' });
    }

    const product = await Product.findOne({ _id: req.fields.product }).populate('reviews');

    if (!product) {
      return res.status(400).json({ message: 'The specified product does not exist' });
    }

    if (product.reviews === undefined) {
      product.reviews = [];
    }

    product.reviews.push(newReview);

    let sum = 0;

    product.reviews.forEach(review => {
      sum += review.rating;
    });

    product.averageRating = sum / product.reviews.length;

    await newReview.save();
    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

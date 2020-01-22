const express = require("express");
const router = express.Router();

const Category = require("../models/Category");

// Create:
router.post("/category/create", async (req, res) => {
  try {
    const newCategory = new Category({
      title: req.fields.title,
      description: req.fields.description,
      department: req.fields.department
    });

    await newCategory.save();

    return res.json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

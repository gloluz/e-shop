const express = require("express");
const Category = require("../models/Category");
const Department = require("../models/Department");

const router = express.Router();

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

// Read:
router.get("/category", async (req, res) => {
  try {
    const category = await Category.find().populate("department");

    if (category.length > 0) {
      return res.json(category);
    } else {
      return res.status(400).json({ message: "No category found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update:
router.post("/category/update", async (req, res) => {
  try {
    const categoryToUpdate = await Category.findById(req.query.id);

    console.log(categoryToUpdate);

    if (!categoryToUpdate) {
      return res.status(400).json({ message: "Category not found" });
    } else {
      categoryToUpdate.title = req.fields.title;
      categoryToUpdate.description = req.fields.description;
      categoryToUpdate.department = req.fields.department;

      await categoryToUpdate.save();

      return res.json(categoryToUpdate);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

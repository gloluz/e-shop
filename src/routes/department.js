const express = require("express");
const Department = require("../models/Department");
const Product = require("../models/Product");
const Category = require("../models/Category");

const router = express.Router();

// Create:
router.post("/department/create", async (req, res) => {
  try {
    const newDepartment = new Department({
      title: req.fields.title
    });

    await newDepartment.save();

    return res.json(newDepartment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Read:
router.get("/department", async (req, res) => {
  try {
    const listDepartment = await Department.find();

    if (listDepartment.length > 0) {
      return res.json(listDepartment);
    } else {
      return res.status(400).json({ message: "No department found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update:
router.post("/department/update", async (req, res) => {
  try {
    const departmentToUpdate = await Department.findById(req.query._id);

    if (!departmentToUpdate) {
      return res.status(400).json({ message: "Department not found" });
    } else {
      departmentToUpdate.title = req.fields.title;

      await departmentToUpdate.save();

      return res.json(departmentToUpdate);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Delete:
// router.post("/department/delete", async (req, res) => {
//   try {
//     const departmentToDelete = await Department.findOne(req.query.id);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;

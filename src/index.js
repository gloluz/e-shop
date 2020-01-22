const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const departmentRoutes = require("./routes/department");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

const app = express();
app.use(formidableMiddleware());

mongoose.connect("mongodb://localhost/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(departmentRoutes);

app.use(categoryRoutes);

app.use(productRoutes);

app.all("*", function(req, res) {
  res.json({ message: "all routes" });
});

app.listen(3000, () => {
  console.log("Server started");
});

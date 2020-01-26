require('dotenv').config();
const express = require('express');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
const mongoose = require('mongoose');

const departmentRoutes = require('./routes/department');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();
app.use(formidableMiddleware());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', async (req, res) => {
  try {
    return res.json({ message: 'Welcome to the e-shop API' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.use(departmentRoutes);

app.use(categoryRoutes);

app.use(productRoutes);

app.all('*', function(req, res) {
  res.json({ message: 'all routes' });
});

app.listen(process.env.PORT, () => {
  console.log('Server started');
});

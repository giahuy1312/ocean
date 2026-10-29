require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors({ origin: [process.env.CLIENT_CUSTOMER_URL, process.env.CLIENT_ADMIN_URL].filter(Boolean) }));
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ success: true, message: 'OCEAN API is running' }));
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: 'API endpoint not found' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ocean';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`OCEAN API listening at http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });

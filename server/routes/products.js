const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /api/products?category=ca-betta&search=betta&page=1&limit=12&featured=true
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 50);
    const filter = { active: true };
    if (req.query.category) {
      const Category = require('../models/Category');
      const category = await Category.findOne({ slug: req.query.category, active: true });
      if (!category) return res.json({ success: true, data: [], pagination: { page, limit, total: 0, pages: 0 } });
      filter.category = category._id;
    }
    if (req.query.featured === 'true') filter.featured = true;
    if (req.query.search) filter.$text = { $search: req.query.search.trim() };
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Math.max(Number(req.query.minPrice) || 0, 0);
      if (req.query.maxPrice) filter.price.$lte = Math.max(Number(req.query.maxPrice) || 0, 0);
    }
    const total = await Product.countDocuments(filter);
    const data = await Product.find(filter).populate('category', 'name slug').sort({ featured: -1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    res.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
});
router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const value = req.params.idOrSlug;
    const query = value.match(/^[0-9a-fA-F]{24}$/) ? { _id: value, active: true } : { slug: value, active: true };
    const product = await Product.findOne(query).populate('category', 'name slug description').lean();
    if (!product) return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    res.json({ success: true, data: product });
  } catch (error) { next(error); }
});
module.exports = router;

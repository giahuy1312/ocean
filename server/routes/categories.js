const express = require('express');
const Category = require('../models/Category');
const Product = require('../models/Product');
const router = express.Router();

// GET /api/categories?active=true
router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.active === 'true' ? { active: true } : {};
    const categories = await Category.find(filter).sort({ name: 1 }).lean();
    const counts = await Product.aggregate([{ $match: { active: true } }, { $group: { _id: '$category', count: { $sum: 1 } } }]);
    const countMap = new Map(counts.map(item => [String(item._id), item.count]));
    res.json({ success: true, data: categories.map(c => ({ ...c, productCount: countMap.get(String(c._id)) || 0 })) });
  } catch (error) { next(error); }
});
router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const value = req.params.idOrSlug;
    const category = value.match(/^[0-9a-fA-F]{24}$/) ? await Category.findById(value) : await Category.findOne({ slug: value });
    if (!category) return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục' });
    res.json({ success: true, data: category });
  } catch (error) { next(error); }
});
module.exports = router;

const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 140 },
  slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, min: 0, default: null },
  stock: { type: Number, min: 0, default: 0 },
  image: { type: String, default: '' },
  images: [{ type: String }],
  shortDescription: { type: String, default: '' },
  description: { type: String, default: '' },
  careLevel: { type: String, enum: ['Dễ', 'Trung bình', 'Khó'], default: 'Dễ' },
  origin: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
}, { timestamps: true });
productSchema.index({ name: 'text', shortDescription: 'text', description: 'text' });
module.exports = mongoose.model('Product', productSchema);

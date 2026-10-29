require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const categories = [
  { name: 'Cá Betta', slug: 'ca-betta', description: 'Cá Betta nổi bật với màu sắc rực rỡ và dáng bơi duyên dáng.', image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=900&q=80' },
  { name: 'Cá vàng', slug: 'ca-vang', description: 'Những người bạn nhỏ phù hợp với bể cá gia đình.', image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80' },
  { name: 'Cá nhiệt đới', slug: 'ca-nhiet-doi', description: 'Các loài cá nhiệt đới nhiều màu sắc cho bể thủy sinh.', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=900&q=80' },
  { name: 'Cá dọn bể', slug: 'ca-don-be', description: 'Các loài cá hỗ trợ hệ sinh thái bể cá cân bằng.', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80' }
];
async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ocean');
  await Category.deleteMany({}); await Product.deleteMany({});
  const savedCategories = await Category.insertMany(categories);
  const bySlug = Object.fromEntries(savedCategories.map(c => [c.slug, c._id]));
  await Product.insertMany([
    { name: 'Betta Halfmoon Blue', slug: 'betta-halfmoon-blue', category: bySlug['ca-betta'], price: 150000, oldPrice: 180000, stock: 12, image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=1000&q=85', shortDescription: 'Sắc xanh nổi bật, vây xòe mềm mại.', description: 'Cá Betta Halfmoon với màu xanh nổi bật. Nên nuôi riêng, giữ nước sạch và ổn định nhiệt độ phù hợp.', careLevel: 'Trung bình', origin: 'Đông Nam Á', featured: true },
    { name: 'Cá vàng Oranda', slug: 'ca-vang-oranda', category: bySlug['ca-vang'], price: 220000, stock: 8, image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1000&q=85', shortDescription: 'Dáng bơi chậm rãi, phù hợp bể rộng.', description: 'Cá vàng Oranda cần bể có thể tích phù hợp, lọc tốt và thay nước định kỳ.', careLevel: 'Trung bình', origin: 'Châu Á', featured: true },
    { name: 'Cá Neon Tetra', slug: 'ca-neon-tetra', category: bySlug['ca-nhiet-doi'], price: 18000, stock: 60, image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=1000&q=85', shortDescription: 'Sắc xanh đỏ lung linh khi bơi theo đàn.', description: 'Neon Tetra là cá nhỏ hiền, nên nuôi theo đàn trong bể đã ổn định hệ vi sinh.', careLevel: 'Dễ', origin: 'Nam Mỹ', featured: true },
    { name: 'Cá Corydoras', slug: 'ca-corydoras', category: bySlug['ca-don-be'], price: 35000, stock: 25, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=85', shortDescription: 'Cá đáy hiền lành, hoạt động theo nhóm.', description: 'Corydoras thích nền cát mịn, nước sạch và môi trường yên tĩnh. Không thay thế việc vệ sinh bể.', careLevel: 'Dễ', origin: 'Nam Mỹ', featured: false },
    { name: 'Betta Koi Galaxy', slug: 'betta-koi-galaxy', category: bySlug['ca-betta'], price: 195000, stock: 6, image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=1000&q=85', shortDescription: 'Hoa văn nhiều màu độc đáo.', description: 'Betta Koi Galaxy có hoa văn đa sắc. Cần môi trường sạch và khẩu phần ăn phù hợp.', careLevel: 'Trung bình', origin: 'Đông Nam Á', featured: true },
    { name: 'Cá bảy màu', slug: 'ca-bay-mau', category: bySlug['ca-nhiet-doi'], price: 12000, stock: 80, image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=1000&q=85', shortDescription: 'Nhỏ nhắn, nhiều màu và dễ chăm sóc.', description: 'Cá bảy màu phù hợp người mới bắt đầu. Theo dõi chất lượng nước và tránh thả quá dày.', careLevel: 'Dễ', origin: 'Nam Mỹ', featured: false }
  ]);
  console.log('Seed completed: categories and sample products inserted.');
  await mongoose.disconnect();
}
seed().catch(err => { console.error(err); process.exit(1); });

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: 'Dr. Evelyn Sterling' },
  readTime: { type: String, default: '5 min read' },
  coverImage: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
  tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);

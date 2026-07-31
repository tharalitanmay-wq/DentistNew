const Blog = require('../models/Blog');
const { getIsConnected } = require('../config/db');
const { seedBlogs } = require('../utils/seedData');

let memoryBlogs = [...seedBlogs];

const getBlogs = async (req, res) => {
  try {
    if (getIsConnected()) {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      if (blogs.length === 0) return res.json({ success: true, blogs: seedBlogs });
      return res.json({ success: true, blogs });
    } else {
      return res.json({ success: true, blogs: memoryBlogs });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (getIsConnected()) {
      const blog = await Blog.findOne({ slug });
      if (!blog) return res.status(404).json({ success: false, message: 'Article not found' });
      return res.json({ success: true, blog });
    } else {
      const blog = memoryBlogs.find(b => b.slug === slug || b._id === slug);
      if (!blog) return res.status(404).json({ success: false, message: 'Article not found' });
      return res.json({ success: true, blog });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, author, coverImage } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (getIsConnected()) {
      const blog = await Blog.create({ ...req.body, slug });
      return res.status(201).json({ success: true, blog });
    } else {
      const newBlog = { _id: 'blg-' + Date.now(), ...req.body, slug, createdAt: new Date().toISOString() };
      memoryBlogs.unshift(newBlog);
      return res.status(201).json({ success: true, blog: newBlog });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      return res.json({ success: true, blog });
    } else {
      const idx = memoryBlogs.findIndex(b => b._id === id);
      if (idx !== -1) {
        memoryBlogs[idx] = { ...memoryBlogs[idx], ...req.body };
        return res.json({ success: true, blog: memoryBlogs[idx] });
      }
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Blog.findByIdAndDelete(id);
    } else {
      memoryBlogs = memoryBlogs.filter(b => b._id !== id);
    }
    res.json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };

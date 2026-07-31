const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', authenticate, requireRole('admin'), createBlog);
router.put('/:id', authenticate, requireRole('admin'), updateBlog);
router.delete('/:id', authenticate, requireRole('admin'), deleteBlog);

module.exports = router;

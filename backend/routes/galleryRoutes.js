const express = require('express');
const router = express.Router();
const { getGallery, createGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', getGallery);
router.post('/', authenticate, requireRole('admin'), createGalleryItem);
router.delete('/:id', authenticate, requireRole('admin'), deleteGalleryItem);

module.exports = router;

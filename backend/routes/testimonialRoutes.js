const express = require('express');
const router = express.Router();
const { getTestimonials, createTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', getTestimonials);
router.post('/', authenticate, requireRole('admin'), createTestimonial);
router.delete('/:id', authenticate, requireRole('admin'), deleteTestimonial);

module.exports = router;

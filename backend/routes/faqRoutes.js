const express = require('express');
const router = express.Router();
const { getFAQs, createFAQ, deleteFAQ } = require('../controllers/faqController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', getFAQs);
router.post('/', authenticate, requireRole('admin'), createFAQ);
router.delete('/:id', authenticate, requireRole('admin'), deleteFAQ);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getServices, createService, updateService, deleteService } = require('../controllers/serviceController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', getServices);
router.post('/', authenticate, requireRole('admin'), createService);
router.put('/:id', authenticate, requireRole('admin'), updateService);
router.delete('/:id', authenticate, requireRole('admin'), deleteService);

module.exports = router;

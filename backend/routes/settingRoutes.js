const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', getSettings);
router.put('/', authenticate, requireRole('admin'), updateSettings);

module.exports = router;

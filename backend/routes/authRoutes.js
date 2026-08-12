const express = require('express');
const router = express.Router();
const { register, login, adminLogin, getMe, updateProfile, getAllCustomers } = require('../controllers/authController');
const { authenticate, requireRole } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);
router.get('/customers', authenticate, requireRole('admin'), getAllCustomers);

module.exports = router;

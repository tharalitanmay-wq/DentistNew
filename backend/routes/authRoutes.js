const express = require('express');
const router = express.Router();
const { register, login, adminLogin, getMe, updateProfile, getAllCustomers, setup2FA, verifySetup2FA, disable2FA, verifyLogin2FA } = require('../controllers/authController');
const { authenticate, requireRole } = require('../middleware/auth');

router.post('/register',     register);
router.post('/login',        login);
router.post('/admin-login',  adminLogin);
router.get('/me',            authenticate, getMe);
router.put('/profile',       authenticate, updateProfile);
router.get('/customers',     authenticate, requireRole('admin'), getAllCustomers);

// Google Authenticator 2FA routes
router.post('/2fa/setup',         authenticate, setup2FA);
router.post('/2fa/verify-setup',  authenticate, verifySetup2FA);
router.post('/2fa/disable',       authenticate, disable2FA);
router.post('/2fa/verify-login',  verifyLogin2FA);

module.exports = router;

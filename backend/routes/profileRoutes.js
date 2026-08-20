const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { uploadSinglePhoto } = require('../middleware/upload');
const { getProfile, uploadProfilePhoto, deleteProfilePhoto } = require('../controllers/profileController');

// GET /api/profile - Fetch user profile with S3 presigned photo URL
router.get('/', authenticate, getProfile);

// POST /api/profile/photo - Upload or replace profile photo
router.post('/photo', authenticate, uploadSinglePhoto, uploadProfilePhoto);

// DELETE /api/profile/photo - Remove profile photo
router.delete('/photo', authenticate, deleteProfilePhoto);

module.exports = router;

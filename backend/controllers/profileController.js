const crypto = require('crypto');
const path = require('path');
const Customer = require('../models/Customer');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { uploadToS3, deleteFromS3, generatePresignedUrl } = require('../utils/s3Service');
const { memoryCustomers } = require('./authController');

/**
 * Helper to get user record from MySQL DB or in-memory fallback
 */
const findUserById = async (userId, role = 'patient') => {
  if (getIsConnected()) {
    let user = await Customer.findByPk(userId);
    if (!user) {
      user = await User.findByPk(userId);
    }
    return user;
  } else {
    // In-memory store fallback
    if (global.memoryCustomersStore) {
      return global.memoryCustomersStore.find(c => String(c.id) === String(userId));
    }
    return null;
  }
};

/**
 * GET /api/profile
 * Get authenticated user profile with presigned S3 photo URL
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let userObj = null;
    let profileImageKey = null;

    if (getIsConnected()) {
      let customer = await Customer.findByPk(userId, { attributes: { exclude: ['password'] } });
      if (!customer) {
        let legacyUser = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
        if (legacyUser) {
          userObj = legacyUser.toJSON();
        }
      } else {
        userObj = customer.toJSON();
      }
    } else {
      if (global.memoryCustomersStore) {
        const memCust = global.memoryCustomersStore.find(c => String(c.id) === String(userId));
        if (memCust) {
          const { password, ...safeCust } = memCust;
          userObj = safeCust;
        }
      }
    }

    if (!userObj) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    profileImageKey = userObj.profile_image_key || null;
    let presignedUrl = null;

    if (profileImageKey) {
      presignedUrl = await generatePresignedUrl(profileImageKey);
    }

    return res.status(200).json({
      success: true,
      user: {
        ...userObj,
        profile_image_key: profileImageKey,
        profile_image_url: presignedUrl,
        avatar: presignedUrl || userObj.avatar || null
      }
    });

  } catch (error) {
    console.error('[Get Profile Error]:', error);
    return res.status(500).json({ success: false, message: 'Internal server error while fetching profile' });
  }
};

/**
 * POST /api/profile/photo
 * Upload or replace authenticated user's profile photo to S3
 */
const uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload.' });
    }

    // Determine extension
    const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
    const randomHash = crypto.randomBytes(6).toString('hex');
    // Format: profile-images/USER_ID/UNIQUE_FILE_NAME.jpg
    const s3Key = `profile-images/${userId}/${randomHash}-profile${ext}`;

    let existingKey = null;
    let dbUserRecord = null;

    if (getIsConnected()) {
      dbUserRecord = await Customer.findByPk(userId);
      if (!dbUserRecord) {
        dbUserRecord = await User.findByPk(userId);
      }
      if (dbUserRecord) {
        existingKey = dbUserRecord.profile_image_key;
      }
    } else {
      if (global.memoryCustomersStore) {
        const memCust = global.memoryCustomersStore.find(c => String(c.id) === String(userId));
        if (memCust) {
          existingKey = memCust.profile_image_key;
        }
      }
    }

    // STEP 1: Upload new image to S3 bucket
    let uploadedKey = null;
    try {
      uploadedKey = await uploadToS3(req.file.buffer, s3Key, req.file.mimetype);
    } catch (s3Err) {
      console.error('[S3 Upload Failure]:', s3Err);
      return res.status(500).json({
        success: false,
        message: 'Unable to upload profile photo. Please try again.'
      });
    }

    // STEP 2: Update Database after successful S3 upload
    if (getIsConnected() && dbUserRecord) {
      dbUserRecord.profile_image_key = uploadedKey;
      await dbUserRecord.save();
    } else if (global.memoryCustomersStore) {
      const memCust = global.memoryCustomersStore.find(c => String(c.id) === String(userId));
      if (memCust) {
        memCust.profile_image_key = uploadedKey;
      }
    }

    // STEP 3: Delete old S3 image ONLY AFTER new upload & DB save succeeded
    if (existingKey && existingKey !== uploadedKey) {
      deleteFromS3(existingKey).catch(err => {
        console.warn(`[S3 Cleanup Notice] Failed to remove old key ${existingKey}:`, err.message);
      });
    }

    // STEP 4: Generate presigned URL for immediate display
    const presignedUrl = await generatePresignedUrl(uploadedKey);

    return res.status(200).json({
      success: true,
      message: 'Profile photo updated successfully.',
      profile_image_key: uploadedKey,
      profile_image_url: presignedUrl,
      user: {
        id: userId,
        profile_image_key: uploadedKey,
        profile_image_url: presignedUrl,
        avatar: presignedUrl
      }
    });

  } catch (error) {
    console.error('[Upload Profile Photo Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to upload profile photo. Please try again.'
    });
  }
};

/**
 * DELETE /api/profile/photo
 * Delete authenticated user's profile photo from S3 and set profile_image_key to NULL
 */
const deleteProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id;

    let existingKey = null;
    let dbUserRecord = null;

    if (getIsConnected()) {
      dbUserRecord = await Customer.findByPk(userId);
      if (!dbUserRecord) {
        dbUserRecord = await User.findByPk(userId);
      }
      if (dbUserRecord) {
        existingKey = dbUserRecord.profile_image_key;
      }
    } else {
      if (global.memoryCustomersStore) {
        const memCust = global.memoryCustomersStore.find(c => String(c.id) === String(userId));
        if (memCust) {
          existingKey = memCust.profile_image_key;
        }
      }
    }

    // Delete object from S3 if key exists
    if (existingKey) {
      try {
        await deleteFromS3(existingKey);
      } catch (s3Err) {
        console.warn(`[S3 Delete Warning] Failed to delete ${existingKey}:`, s3Err.message);
      }
    }

    // Update database record to NULL
    if (getIsConnected() && dbUserRecord) {
      dbUserRecord.profile_image_key = null;
      await dbUserRecord.save();
    } else if (global.memoryCustomersStore) {
      const memCust = global.memoryCustomersStore.find(c => String(c.id) === String(userId));
      if (memCust) {
        memCust.profile_image_key = null;
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Profile photo removed successfully.',
      user: {
        id: userId,
        profile_image_key: null,
        profile_image_url: null,
        avatar: null
      }
    });

  } catch (error) {
    console.error('[Delete Profile Photo Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to remove profile photo. Please try again.'
    });
  }
};

module.exports = {
  getProfile,
  uploadProfilePhoto,
  deleteProfilePhoto
};

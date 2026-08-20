const multer = require('multer');

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(new Error('No file provided'), false);
  }

  const mimeType = file.mimetype ? file.mimetype.toLowerCase() : '';
  const originalName = file.originalname ? file.originalname.toLowerCase() : '';
  const hasValidExt = ALLOWED_EXTENSIONS.some(ext => originalName.endsWith(ext));

  if (ALLOWED_MIME_TYPES.includes(mimeType) || hasValidExt) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Only JPG, JPEG, PNG, and WEBP formats are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: fileFilter
});

/**
 * Helper to validate magic bytes (file signature) of image buffer
 * Ensures client didn't just rename an executable/script to .jpg
 */
const validateImageBuffer = (buffer) => {
  if (!buffer || buffer.length < 4) return false;

  // JPEG / JPG: FF D8 FF
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
    return true;
  }

  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    return true;
  }

  // WEBP: RIFF...WEBP (bytes 0-3: 52 49 46 46, bytes 8-11: 57 45 42 50)
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) {
    return true;
  }

  return false;
};

// Express middleware wrapper to catch Multer errors cleanly
const uploadSinglePhoto = (req, res, next) => {
  upload.single('photo')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File size exceeds the 5 MB limit. Please upload a smaller image.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Invalid image upload'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image file to upload.'
      });
    }

    // Validate magic bytes
    if (!validateImageBuffer(req.file.buffer)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format detected. Only valid JPG, JPEG, PNG, and WEBP files are allowed.'
      });
    }

    next();
  });
};

module.exports = {
  uploadSinglePhoto,
  validateImageBuffer,
  MAX_FILE_SIZE
};

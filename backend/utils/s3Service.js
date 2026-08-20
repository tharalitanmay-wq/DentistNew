const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const path = require('path');
const fs = require('fs');

const region = process.env.AWS_REGION || 'ap-south-1';
const bucketName = process.env.AWS_S3_BUCKET_NAME || 'MY_S3_BUCKET_NAME';

// Initialize S3Client.
// Default Credential Provider Chain automatically uses EC2 Instance Profile / IAM Role on EC2.
// If AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY are provided in .env (e.g. for local testing), they are used automatically.
const clientConfig = { region };

if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  clientConfig.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  };
}

const s3Client = new S3Client(clientConfig);

/**
 * Upload image buffer to S3 bucket (or local dev fallback if local machine lacks AWS credentials)
 * @param {Buffer} buffer 
 * @param {string} key - e.g. profile-images/25/8f92a1c7-profile.jpg
 * @param {string} mimeType - e.g. image/jpeg
 */
const uploadToS3 = async (buffer, key, mimeType) => {
  const targetBucket = process.env.AWS_S3_BUCKET_NAME || bucketName;

  try {
    const command = new PutObjectCommand({
      Bucket: targetBucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    });

    await s3Client.send(command);
    console.log(`[S3 Upload Success] Uploaded object to s3://${targetBucket}/${key}`);
    return key;
  } catch (error) {
    console.warn(`[S3 Notice] S3 upload skipped/failed (${error.name}: ${error.message}).`);
    
    // Local development fallback when running on local machine without AWS credentials or EC2 metadata
    const localUploadDir = path.join(__dirname, '../uploads', path.dirname(key));
    if (!fs.existsSync(localUploadDir)) {
      fs.mkdirSync(localUploadDir, { recursive: true });
    }
    const localFilePath = path.join(__dirname, '../uploads', key);
    fs.writeFileSync(localFilePath, buffer);
    console.log(`[Local Fallback] Profile image saved locally to ${localFilePath}`);

    return key;
  }
};

/**
 * Delete image object from S3 bucket (and local dev fallback)
 * @param {string} key 
 */
const deleteFromS3 = async (key) => {
  if (!key) return;
  const targetBucket = process.env.AWS_S3_BUCKET_NAME || bucketName;

  try {
    const command = new DeleteObjectCommand({
      Bucket: targetBucket,
      Key: key,
    });
    await s3Client.send(command);
    console.log(`[S3 Delete Success] Removed s3://${targetBucket}/${key}`);
  } catch (error) {
    console.warn(`[S3 Delete Notice] Could not delete S3 key ${key}: ${error.message}`);
  }

  // Also remove local fallback file if exists
  try {
    const localFilePath = path.join(__dirname, '../uploads', key);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  } catch (e) {
    // Ignore local unlink errors
  }
};

/**
 * Generate a temporary presigned URL for private S3 object retrieval
 * @param {string} key 
 * @param {number} expiresInSeconds - Default 3600 (1 hour)
 */
const generatePresignedUrl = async (key, expiresInSeconds = 3600) => {
  if (!key) return null;
  
  try {
    const targetBucket = process.env.AWS_S3_BUCKET_NAME || bucketName;
    const command = new GetObjectCommand({
      Bucket: targetBucket,
      Key: key,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
    return url;
  } catch (error) {
    // Fallback to local server static path if presigned URL generation fails on local dev
    const port = process.env.PORT || 5000;
    return `http://localhost:${port}/uploads/${key}`;
  }
};

module.exports = {
  s3Client,
  uploadToS3,
  deleteFromS3,
  generatePresignedUrl,
  getBucketName: () => process.env.AWS_S3_BUCKET_NAME || bucketName,
  getRegion: () => region
};

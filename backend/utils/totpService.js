const speakeasy = require('speakeasy');
const qrcode    = require('qrcode');
const crypto    = require('crypto');

const generateSecret = (userEmail) => {
  return speakeasy.generateSecret({
    name:   `Pearl Dental (${userEmail})`,
    issuer: 'Pearl Dental Care',
    length: 20,
  });
};

const generateQRCode = async (otpauthUrl) => {
  return await qrcode.toDataURL(otpauthUrl);
};

const verifyTOTP = (secret, token) => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token:    String(token).trim(),
    window:   1,
  });
};

const generateRecoveryCodes = () => {
  return Array.from({ length: 8 }, () =>
    crypto.randomBytes(4).toString('hex').toUpperCase()
  );
};

module.exports = { generateSecret, generateQRCode, verifyTOTP, generateRecoveryCodes };

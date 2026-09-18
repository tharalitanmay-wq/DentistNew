const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Customer = require('../models/Customer');
const Admin = require('../models/Admin');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');
const { generatePresignedUrl } = require('../utils/s3Service');
const { generateSecret, generateQRCode, verifyTOTP, generateRecoveryCodes } = require('../utils/totpService');

// In-memory fallback stores when MySQL is offline
const memoryAdmins = [
  {
    id: 1,
    name: 'Master Admin',
    username: 'admin',
    email: 'admin@pearldental.com',
    password: '$2a$10$wE99V9n8tE5fCq6m/A0U.eQ80Jq55uO1vM7c4.6Y1z5/5G7J1K1.', // AdminPass123!
    role: 'admin'
  }
];

const memoryCustomers = [
  {
    id: 1,
    name: 'Johnathan Miller',
    username: 'jmiller',
    email: 'patient@example.com',
    phone: '+1 (555) 234-5678',
    password: '$2a$10$wE99V9n8tE5fCq6m/A0U.eQ80Jq55uO1vM7c4.6Y1z5/5G7J1K1.', // AdminPass123!
    role: 'patient',
    profile_image_key: null
  },
  {
    id: 2,
    name: 'Sahil',
    username: 'sahil',
    email: 'sahil@gmail.com',
    phone: '+1 (555) 999-8888',
    password: '$2a$10$wE99V9n8tE5fCq6m/A0U.eQ80Jq55uO1vM7c4.6Y1z5/5G7J1K1.', // AdminPass123!
    role: 'patient',
    profile_image_key: null
  }
];

global.memoryCustomersStore = memoryCustomers;

// 1. CUSTOMER REGISTRATION
const register = async (req, res) => {
  try {
    const { name, username, email, phone, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required.' 
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password and Confirm Password do not match.' 
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanUsername = (username || cleanEmail.split('@')[0]).trim().toLowerCase();

    // Hash password with bcrypt before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (getIsConnected()) {
      try {
        const { Op } = require('sequelize');
        // Check if email or username already exists in customers table
        const existingAccount = await Customer.findOne({ 
          where: { 
            [Op.or]: [
              { email: cleanEmail },
              { username: cleanUsername }
            ] 
          } 
        });

        if (existingAccount) {
          if (existingAccount.email && existingAccount.email.toLowerCase() === cleanEmail) {
            return res.status(400).json({ 
              success: false, 
              message: 'An account with this email already exists.' 
            });
          } else {
            return res.status(400).json({ 
              success: false, 
              message: 'This username is already taken. Please enter a different username.' 
            });
          }
        }

        // Save customer record in customers table with bcrypt hashed password
        const customer = await Customer.create({
          name: String(name).trim(),
          username: cleanUsername,
          email: cleanEmail,
          phone: phone ? String(phone).trim() : '',
          password: hashedPassword
        });

        return res.status(201).json({
          success: true,
          message: 'Registration successful! Please login with your credentials.',
          customer: {
            id: customer.id,
            name: customer.name,
            username: customer.username,
            email: customer.email,
            phone: customer.phone
          }
        });
      } catch (dbErr) {
        console.warn('DB creation error, using memory fallback:', dbErr.message);
      }
    }

    // Memory store fallback
    const existsEmail = memoryCustomers.find(c => c.email.toLowerCase() === cleanEmail);
    if (existsEmail) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const newCust = {
      id: memoryCustomers.length + 1,
      name: String(name).trim(),
      username: cleanUsername,
      email: cleanEmail,
      phone: phone ? String(phone).trim() : '',
      password: hashedPassword,
      role: 'patient'
    };
    memoryCustomers.push(newCust);

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Please login with your credentials.',
      customer: {
        id: newCust.id,
        name: newCust.name,
        username: newCust.username,
        email: newCust.email,
        phone: newCust.phone
      }
    });
  } catch (error) {
    console.error('[Registration Failure]:', error);
    res.status(500).json({ success: false, message: error.message || 'Registration failed.' });
  }
};

// 2. CUSTOMER LOGIN (STRICT DATABASE BCRYPT AUTHENTICATION)
const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const loginEmail = String(email || username || '').trim().toLowerCase();

    // REJECT IMMEDIATELY if email or password missing
    if (!loginEmail || !password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    let user = null;

    if (getIsConnected()) {
      const { Op } = require('sequelize');
      // Step 1: Find user in customers table by email
      user = await Customer.findOne({
        where: {
          [Op.or]: [
            { email: loginEmail },
            { username: loginEmail }
          ]
        }
      });

      // Fallback: Check legacy User table
      if (!user) {
        user = await User.findOne({
          where: {
            [Op.or]: [
              { email: loginEmail }
            ]
          }
        });
      }
    } else {
      user = memoryCustomers.find(
        c => c.email.toLowerCase() === loginEmail || c.username.toLowerCase() === loginEmail
      );
    }

    // STEP 2: REJECT LOGIN IMMEDIATELY IF USER DOES NOT EXIST
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // STEP 3: Compare entered password with stored bcrypt hash using bcrypt.compare()
    const storedHash = user.password;
    const isPasswordValid = await bcrypt.compare(password, storedHash);

    // STEP 4: REJECT LOGIN IMMEDIATELY IF BCRYPT MATCH FAILS
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // STEP 5: Check if 2FA is enabled for this user
    if (user.totp_enabled && user.totp_secret) {
      // Issue a short-lived temp token (5 min) — no full access yet
      const tempToken = jwt.sign(
        { id: user.id, twofa_pending: true },
        JWT_SECRET,
        { expiresIn: '5m' }
      );
      return res.status(200).json({
        success: true,
        requires2FA: true,
        tempToken,
        message: 'Please enter your Google Authenticator code.'
      });
    }

    // STEP 6: 2FA not enabled — issue full JWT token immediately
    const token = jwt.sign(
      { id: user.id, username: user.username || user.email.split('@')[0], email: user.email, name: user.name, role: user.role || 'patient' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const profileImageKey = user.profile_image_key || null;
    let profileImageUrl = null;
    if (profileImageKey) {
      profileImageUrl = await generatePresignedUrl(profileImageKey);
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username || user.email.split('@')[0],
        email: user.email,
        phone: user.phone || '',
        role: user.role || 'patient',
        profile_image_key: profileImageKey,
        profile_image_url: profileImageUrl,
        avatar: profileImageUrl || user.avatar || null
      }
    });

  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password' 
    });
  }
};

// ─── GOOGLE AUTHENTICATOR 2FA ENDPOINTS ───────────────────────────────────────

// A) Setup: generate secret + QR code
const setup2FA = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Customer.findByPk(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const secret = generateSecret(user.email);
    // Save unverified secret (totp_enabled stays false until verified)
    await user.update({ totp_secret: secret.base32 });

    const qrCode = await generateQRCode(secret.otpauth_url);
    return res.json({ success: true, qrCode, secret: secret.base32 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// B) Verify setup: confirm 6-digit code → enable 2FA
const verifySetup2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.id;
    const user = await Customer.findByPk(userId);
    if (!user || !user.totp_secret) {
      return res.status(400).json({ success: false, message: '2FA setup not started. Please generate QR code first.' });
    }

    const isValid = verifyTOTP(user.totp_secret, token);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid code. Please try again.' });
    }

    const recoveryCodes = generateRecoveryCodes();
    await user.update({
      totp_enabled: true,
      totp_recovery: JSON.stringify(recoveryCodes)
    });

    return res.json({ success: true, message: '2FA enabled successfully!', recoveryCodes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// C) Disable 2FA
const disable2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.id;
    const user = await Customer.findByPk(userId);
    if (!user || !user.totp_enabled) {
      return res.status(400).json({ success: false, message: '2FA is not enabled.' });
    }

    const isValid = verifyTOTP(user.totp_secret, token);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid code. Cannot disable 2FA.' });
    }

    await user.update({ totp_enabled: false, totp_secret: null, totp_recovery: null });
    return res.json({ success: true, message: '2FA disabled successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// D) Verify login 2FA code → issue full JWT
const verifyLogin2FA = async (req, res) => {
  try {
    const { tempToken, totpCode } = req.body;
    if (!tempToken || !totpCode) {
      return res.status(400).json({ success: false, message: 'Missing token or code.' });
    }

    // Decode temp token
    let payload;
    try {
      payload = jwt.verify(tempToken, JWT_SECRET);
    } catch {
      return res.status(401).json({ success: false, message: 'Session expired. Please login again.' });
    }

    if (!payload.twofa_pending) {
      return res.status(400).json({ success: false, message: 'Invalid request.' });
    }

    const user = await Customer.findByPk(payload.id);
    if (!user || !user.totp_enabled || !user.totp_secret) {
      return res.status(400).json({ success: false, message: 'User not found or 2FA not enabled.' });
    }

    // Check TOTP code
    const isValid = verifyTOTP(user.totp_secret, totpCode);

    // Check recovery codes as fallback
    let usedRecovery = false;
    if (!isValid && user.totp_recovery) {
      const codes = JSON.parse(user.totp_recovery);
      const idx = codes.indexOf(String(totpCode).toUpperCase());
      if (idx !== -1) {
        codes.splice(idx, 1); // remove used code
        await user.update({ totp_recovery: JSON.stringify(codes) });
        usedRecovery = true;
      }
    }

    if (!isValid && !usedRecovery) {
      return res.status(401).json({ success: false, message: 'Invalid or expired code.' });
    }

    // Issue full JWT
    const fullToken = jwt.sign(
      { id: user.id, username: user.username || user.email.split('@')[0], email: user.email, name: user.name, role: user.role || 'patient' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const profileImageKey = user.profile_image_key || null;
    let profileImageUrl = null;
    if (profileImageKey) profileImageUrl = await generatePresignedUrl(profileImageKey);

    return res.json({
      success: true,
      message: usedRecovery ? 'Logged in with recovery code.' : 'Login successful!',
      token: fullToken,
      user: {
        id: user.id, name: user.name,
        username: user.username || user.email.split('@')[0],
        email: user.email, phone: user.phone || '',
        role: user.role || 'patient',
        profile_image_key: profileImageKey,
        profile_image_url: profileImageUrl,
        avatar: profileImageUrl || null
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 3. ADMIN LOGIN (STRICT DATABASE BCRYPT AUTHENTICATION)
const adminLogin = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const adminIdentifier = String(email || username || '').trim().toLowerCase();

    if (!adminIdentifier || !password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    let admin = null;

    if (getIsConnected()) {
      const { Op } = require('sequelize');
      admin = await Admin.findOne({
        where: {
          [Op.or]: [
            { email: adminIdentifier },
            { username: adminIdentifier }
          ]
        }
      });
    } else {
      admin = memoryAdmins.find(
        a => a.email.toLowerCase() === adminIdentifier || a.username.toLowerCase() === adminIdentifier
      );
    }

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const storedHash = admin.password;
    const isPasswordValid = await bcrypt.compare(password, storedHash);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email, name: admin.name, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful!',
      token,
      user: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: 'admin'
      }
    });

  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password' 
    });
  }
};

// 4. GET AUTHENTICATED USER PROFILE
const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    if (getIsConnected()) {
      if (role === 'admin') {
        const admin = await Admin.findByPk(userId, { attributes: { exclude: ['password'] } });
        if (!admin) return res.status(404).json({ success: false, message: 'Admin profile not found' });
        return res.json({ success: true, user: { ...admin.toJSON(), role: 'admin' } });
      } else {
        const customer = await Customer.findByPk(userId, { attributes: { exclude: ['password'] } });
        if (!customer) return res.status(404).json({ success: false, message: 'Customer profile not found' });
        const custObj = customer.toJSON();
        let presignedUrl = null;
        if (custObj.profile_image_key) {
          presignedUrl = await generatePresignedUrl(custObj.profile_image_key);
        }
        return res.json({
          success: true,
          user: {
            ...custObj,
            role: 'patient',
            profile_image_url: presignedUrl,
            avatar: presignedUrl || custObj.avatar || null
          }
        });
      }
    } else {
      if (role === 'admin') {
        const admin = memoryAdmins.find(a => a.id == userId);
        if (!admin) return res.status(404).json({ success: false, message: 'Admin profile not found' });
        const { password, ...safeAdmin } = admin;
        return res.json({ success: true, user: safeAdmin });
      } else {
        const customer = memoryCustomers.find(c => c.id == userId);
        if (!customer) return res.status(404).json({ success: false, message: 'Customer profile not found' });
        const { password, ...safeCustomer } = customer;
        let presignedUrl = null;
        if (safeCustomer.profile_image_key) {
          presignedUrl = await generatePresignedUrl(safeCustomer.profile_image_key);
        }
        return res.json({
          success: true,
          user: {
            ...safeCustomer,
            profile_image_url: presignedUrl,
            avatar: presignedUrl || safeCustomer.avatar || null
          }
        });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. UPDATE PERMITTED CUSTOMER PROFILE
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;

    if (getIsConnected()) {
      const customer = await Customer.findByPk(userId);
      if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

      if (name) customer.name = name.trim();
      if (phone !== undefined) customer.phone = phone.trim();

      await customer.save();
      return res.json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          id: customer.id,
          name: customer.name,
          username: customer.username,
          email: customer.email,
          phone: customer.phone,
          role: 'patient'
        }
      });
    } else {
      const customer = memoryCustomers.find(c => c.id == userId);
      if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

      if (name) customer.name = name.trim();
      if (phone !== undefined) customer.phone = phone.trim();

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          id: customer.id,
          name: customer.name,
          username: customer.username,
          email: customer.email,
          phone: customer.phone,
          role: 'patient'
        }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6. ADMIN GET ALL CUSTOMERS
const getAllCustomers = async (req, res) => {
  try {
    if (getIsConnected()) {
      const customers = await Customer.findAll({ attributes: { exclude: ['password'] } });
      return res.json({ success: true, customers });
    } else {
      const safeCustomers = memoryCustomers.map(({ password, ...rest }) => rest);
      return res.json({ success: true, customers: safeCustomers });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, adminLogin, getMe, updateProfile, getAllCustomers, setup2FA, verifySetup2FA, disable2FA, verifyLogin2FA };

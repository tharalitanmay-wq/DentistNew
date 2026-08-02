const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');

// In-memory fallback user store if MySQL is offline
const memoryUsers = [
  {
    id: 1,
    name: 'Master Admin',
    email: 'admin@pearldental.com',
    password: '$2a$10$wE99V9n8tE5fCq6m/A0U.eQ80Jq55uO1vM7c4.6Y1z5/5G7J1K1.', // AdminPass123!
    role: 'admin',
    phone: '+1 (800) 555-0199',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'Johnathan Miller',
    email: 'patient@example.com',
    password: '$2a$10$wE99V9n8tE5fCq6m/A0U.eQ80Jq55uO1vM7c4.6Y1z5/5G7J1K1.',
    role: 'patient',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  }
];

const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    if (getIsConnected()) {
      const existing = await User.findOne({ where: { email: email.toLowerCase() } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Account already exists with this email' });
      }
      const user = await User.create({ name, email: email.toLowerCase(), password, phone, role: role || 'patient' });
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar }
      });
    } else {
      const exists = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return res.status(400).json({ success: false, message: 'Account already exists with this email' });
      }
      const newUser = {
        id: memoryUsers.length + 1,
        name,
        email,
        password,
        phone: phone || '',
        role: role || 'patient',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
      };
      memoryUsers.push(newUser);
      const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        success: true,
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, phone: newUser.phone, avatar: newUser.avatar }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (getIsConnected()) {
      const user = await User.findOne({ where: { email: email.toLowerCase() } });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar }
      });
    } else {
      const user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials. Try admin@pearldental.com / AdminPass123!' });
      }
      const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    if (getIsConnected()) {
      const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.json({ success: true, user });
    } else {
      const user = memoryUsers.find(u => u.id == userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      const { password, ...safeUser } = user;
      return res.json({ success: true, user: safeUser });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, getMe };

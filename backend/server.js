const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const blogRoutes = require('./routes/blogRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const faqRoutes = require('./routes/faqRoutes');
const settingRoutes = require('./routes/settingRoutes');
const aiChatRoutes = require('./routes/aiChatRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/ai-chat', aiChatRoutes);

// Root Status Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Lumina Dental Studio API',
    timestamp: new Date().toISOString()
  });
});

// Global Error Handler
app.use(errorHandler);

// Connect DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✨ [Lumina Dental Server] Running on http://localhost:${PORT}`);
  });
});

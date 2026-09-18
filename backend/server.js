const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
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
const queueRoutes = require('./routes/queueRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Security & Middleware
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  skip: (req) => req.path.startsWith('/profile') || req.path.startsWith('/auth'),
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Serve static uploads
app.use('/uploads', express.static(uploadsDir));

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/ai-chat', aiChatRoutes);
app.use('/api/queue', queueRoutes);

// Root Status Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Pearl Dental Care API',
    timestamp: new Date().toISOString()
  });
});

// Serve Admin CMS Dashboard under /admin (Integrated 2-Process Setup)
const adminBuildPath = path.join(__dirname, '../admin/out');

app.use('/admin', (req, res, next) => {
  if (!fs.existsSync(adminBuildPath)) {
    return res.status(503).send(`
      <div style="font-family:system-ui,sans-serif; background:#0f172a; color:#fff; min-h:100vh; padding:60px 20px; text-align:center;">
        <h1 style="color:#38bdf8;">Lumina Admin CMS - Build Required</h1>
        <p style="color:#94a3b8; max-width:500px; margin:0 auto 20px;">The admin build directory was not found on the server.</p>
        <p style="color:#cbd5e1; font-family:monospace; background:#1e293b; padding:12px; rounded:8px; display:inline-block;">
          cd admin && npm install && npm run build
        </p>
      </div>
    `);
  }
  next();
});

// Serve static assets for /admin, /admin/_next, and /_next
app.use('/admin/_next', express.static(path.join(adminBuildPath, '_next')));
app.use('/admin', express.static(adminBuildPath));
app.use('/_next', express.static(path.join(adminBuildPath, '_next')));

app.get('/admin*', (req, res) => {
  if (!fs.existsSync(adminBuildPath)) {
    return res.status(503).send('Admin CMS build not ready');
  }

  let relativePath = req.path.replace(/^\/admin/, '');
  if (!relativePath || relativePath === '/') {
    return res.sendFile(path.join(adminBuildPath, 'index.html'));
  }

  const directFile = path.join(adminBuildPath, relativePath);
  if (fs.existsSync(directFile) && fs.statSync(directFile).isFile()) {
    return res.sendFile(directFile);
  }

  const htmlFile = path.join(adminBuildPath, `${relativePath.replace(/\/$/, '')}.html`);
  if (fs.existsSync(htmlFile)) {
    return res.sendFile(htmlFile);
  }

  const indexInDir = path.join(adminBuildPath, relativePath, 'index.html');
  if (fs.existsSync(indexInDir)) {
    return res.sendFile(indexInDir);
  }

  // If a static asset (.css, .js, .png, etc.) is missing, return 404 instead of returning index.html
  if (/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i.test(req.path)) {
    return res.status(404).send('Asset not found');
  }

  res.sendFile(path.join(adminBuildPath, 'index.html'));
});

// Global Error Handler
app.use(errorHandler);

// Start Express HTTP Server
const server = app.listen(PORT, () => {
  console.log(`✨ [Lumina Dental Server] Running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use by another process.`);
  } else {
    console.error('Server error:', err);
  }
});

// Connect Database in background
connectDB().catch((err) => {
  console.warn('Database initialization warning:', err.message);
});

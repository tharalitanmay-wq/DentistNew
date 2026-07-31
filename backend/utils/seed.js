const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Doctor = require('../models/Doctor');
const Service = require('../models/Service');
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const User = require('../models/User');

const { seedDoctors, seedServices, seedBlogs, seedGallery, seedTestimonials, seedFAQs } = require('./seedData');

const runSeed = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lumina_dental';
    await mongoose.connect(connStr);
    console.log('Connected to DB for seeding...');

    await Doctor.deleteMany();
    await Service.deleteMany();
    await Blog.deleteMany();
    await Gallery.deleteMany();
    await Testimonial.deleteMany();
    await FAQ.deleteMany();
    await User.deleteMany();

    await Doctor.insertMany(seedDoctors);
    await Service.insertMany(seedServices);
    await Blog.insertMany(seedBlogs);
    await Gallery.insertMany(seedGallery);
    await Testimonial.insertMany(seedTestimonials);
    await FAQ.insertMany(seedFAQs);

    // Create Admin User
    await User.create({
      name: 'Dr. Evelyn Sterling (Admin)',
      email: 'admin@lumina-dental.com',
      password: 'AdminPass123!',
      role: 'admin',
      phone: '+1 (800) 555-LUMINA'
    });

    console.log('✅ Database seeded successfully with luxury dental studio content!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

runSeed();

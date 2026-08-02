const dotenv = require('dotenv');
dotenv.config();

const { sequelize, connectDB } = require('../config/db');
const Doctor = require('../models/Doctor');
const Service = require('../models/Service');
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const User = require('../models/User');
const WalkInQueue = require('../models/WalkInQueue');

const { seedDoctors, seedServices, seedBlogs, seedGallery, seedTestimonials, seedFAQs } = require('./seedData');

const todayStr = new Date().toISOString().split('T')[0];

const runSeed = async () => {
  try {
    await connectDB();
    console.log('Synchronizing MySQL tables for seeding...');

    await sequelize.sync({ force: true }); // Re-create tables

    // Bulk create seed records
    await Doctor.bulkCreate(seedDoctors);
    await Service.bulkCreate(seedServices);
    await Blog.bulkCreate(seedBlogs);
    await Gallery.bulkCreate(seedGallery);
    await Testimonial.bulkCreate(seedTestimonials);
    await FAQ.bulkCreate(seedFAQs);

    // Create Initial Walk-In Queue Patients
    await WalkInQueue.bulkCreate([
      {
        patientName: 'Sophia Reynolds',
        patientNumber: '+1 (555) 234-8899',
        reason: 'Emergency Toothache Consultation',
        tokenNumber: 'TK-01',
        isTreated: false,
        date: todayStr
      },
      {
        patientName: 'Marcus Sterling',
        patientNumber: '+1 (555) 345-9900',
        reason: 'Routine Cleaning & Checkup',
        tokenNumber: 'TK-02',
        isTreated: false,
        date: todayStr
      },
      {
        patientName: 'Elena Rostova',
        patientNumber: '+1 (555) 456-1122',
        reason: 'Veneer Fitting Session',
        tokenNumber: 'TK-03',
        isTreated: true,
        date: todayStr
      }
    ]);

    // Create Admin User
    await User.create({
      name: 'Dr. Evelyn Sterling (Admin)',
      email: 'admin@pearldental.com',
      password: 'AdminPass123!',
      role: 'admin',
      phone: '+1 (800) 555-PEARL'
    });

    console.log('✅ MySQL database seeded successfully with Pearl Dental Care content!');
    process.exit(0);
  } catch (error) {
    console.error('MySQL seeding error:', error);
    process.exit(1);
  }
};

runSeed();

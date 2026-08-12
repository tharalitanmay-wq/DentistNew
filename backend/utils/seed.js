const dotenv = require('dotenv');
dotenv.config();

const { sequelize, connectDB } = require('../config/db');
const Customer = require('../models/Customer');
const Admin = require('../models/Admin');
const Doctor = require('../models/Doctor');
const Service = require('../models/Service');
const Appointment = require('../models/Appointment');
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

    await sequelize.sync({ force: true }); // Re-create tables including admins, customers, and appointments

    // Create Sample Admin in admins table
    await Admin.create({
      name: 'Master Admin',
      username: 'admin',
      email: 'admin@pearldental.com',
      password: 'AdminPass123!'
    });

    // Create Sample Customer in customers table
    const cust1 = await Customer.create({
      name: 'Johnathan Miller',
      username: 'jmiller',
      email: 'patient@example.com',
      phone: '+1 (555) 234-5678',
      password: 'AdminPass123!'
    });

    // Create Sample Sahil Customer
    const sahilCust = await Customer.create({
      name: 'Sahil',
      username: 'sahil',
      email: 'sahil@gmail.com',
      phone: '+1 (555) 999-8888',
      password: 'AdminPass123!'
    });

    // Bulk create seed records
    await Doctor.bulkCreate(seedDoctors);
    await Service.bulkCreate(seedServices);
    await Blog.bulkCreate(seedBlogs);
    await Gallery.bulkCreate(seedGallery);
    await Testimonial.bulkCreate(seedTestimonials);
    await FAQ.bulkCreate(seedFAQs);

    // Create Seed Appointments
    await Appointment.bulkCreate([
      {
        patientName: 'Sahil',
        patientEmail: 'sahil@gmail.com',
        patientPhone: '+1 (555) 999-8888',
        doctorId: '2',
        doctorName: 'Dr. Julian Vance',
        serviceId: '4',
        serviceName: 'Laser Teeth Whitening Luxury Spa',
        date: '2026-08-15',
        timeSlot: '03:30 PM',
        notes: 'Teeth whitening session before event.',
        status: 'Pending',
        userId: String(sahilCust.id),
        reportFile: '/uploads/sample-dental-report.pdf'
      },
      {
        patientName: 'Johnathan Miller',
        patientEmail: 'patient@example.com',
        patientPhone: '+1 (555) 234-5678',
        doctorId: '1',
        doctorName: 'Dr. Evelyn Sterling',
        serviceId: '1',
        serviceName: 'Signature Porcelain Veneers',
        date: '2026-08-20',
        timeSlot: '11:00 AM',
        notes: 'Upper veneers consultation and smile design preview.',
        status: 'Confirmed',
        userId: String(cust1.id),
        reportFile: ''
      }
    ]);

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
      }
    ]);

    // Create Legacy Users table record
    await User.create({
      name: 'Dr. Evelyn Sterling (Admin)',
      email: 'admin@pearldental.com',
      password: 'AdminPass123!',
      role: 'admin',
      phone: '+1 (800) 555-PEARL'
    });

    console.log('✅ MySQL database seeded successfully with appointments, admins, customers, and content!');
    process.exit(0);
  } catch (error) {
    console.error('MySQL seeding error:', error);
    process.exit(1);
  }
};

runSeed();

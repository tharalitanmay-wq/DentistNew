const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  clinicName: {
    type: DataTypes.STRING,
    defaultValue: 'Pearl Dental Care'
  },
  heroHeadline: {
    type: DataTypes.STRING,
    defaultValue: 'Precision Dentistry. Bespoke Elegance.'
  },
  heroSubtext: {
    type: DataTypes.TEXT,
    defaultValue: 'Experience luxury dental care with world-class specialists and cutting-edge technology.'
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: '+1 (800) 555-PEARL'
  },
  emergencyPhone: {
    type: DataTypes.STRING,
    defaultValue: '+1 (800) 999-DENT'
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: 'concierge@pearldental.com'
  },
  whatsapp: {
    type: DataTypes.STRING,
    defaultValue: '+18005555864'
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: '740 Park Avenue, Suite 12B, New York, NY 10021'
  },
  openingHours: {
    type: DataTypes.STRING,
    defaultValue: 'Mon - Fri: 8:00 AM - 7:00 PM | Sat: 9:00 AM - 4:00 PM'
  },
  announcementBanner: {
    type: DataTypes.STRING,
    defaultValue: 'Complimentary Cosmetic Smile Simulation for New Patients'
  },
  showAnnouncement: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  metaTitle: {
    type: DataTypes.STRING,
    defaultValue: 'Pearl Dental Care | Luxury Dental Excellence'
  },
  metaDescription: {
    type: DataTypes.TEXT,
    defaultValue: 'Pinnacle of cosmetic dentistry, dental implants, and porcelain veneers.'
  }
}, {
  timestamps: true
});

module.exports = Setting;

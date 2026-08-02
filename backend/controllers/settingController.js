const Setting = require('../models/Setting');
const { getIsConnected } = require('../config/db');

let memorySettings = {
  clinicName: 'Pearl Dental Care',
  heroHeadline: 'Precision Dentistry. Bespoke Elegance.',
  heroSubtext: 'Experience luxury dental care with world-class specialists and cutting-edge 3D technology.',
  phone: '+1 (800) 555-PEARL',
  emergencyPhone: '+1 (800) 999-DENT',
  email: 'concierge@pearldental.com',
  whatsapp: '+18005555864',
  address: '740 Park Avenue, Suite 12B, New York, NY 10021',
  openingHours: 'Mon - Fri: 8:00 AM - 7:00 PM | Sat: 9:00 AM - 4:00 PM',
  announcementBanner: 'Complimentary Cosmetic Smile Simulation for New Patients',
  showAnnouncement: true,
  metaTitle: 'Pearl Dental Care | Luxury Dental Excellence',
  metaDescription: 'Pinnacle of cosmetic dentistry, dental implants, and porcelain veneers.'
};

const getSettings = async (req, res) => {
  try {
    if (getIsConnected()) {
      let settings = await Setting.findOne();
      if (!settings) {
        settings = await Setting.create(memorySettings);
      }
      return res.json({ success: true, settings });
    } else {
      return res.json({ success: true, settings: memorySettings });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    if (getIsConnected()) {
      let settings = await Setting.findOne();
      if (settings) {
        await settings.update(req.body);
      } else {
        settings = await Setting.create(req.body);
      }
      return res.json({ success: true, settings });
    } else {
      memorySettings = { ...memorySettings, ...req.body };
      return res.json({ success: true, settings: memorySettings });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSettings };

const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  clinicName: { type: String, default: 'Lumina Dental Studio' },
  heroHeadline: { type: String, default: 'Precision Dentistry. Bespoke Elegance.' },
  heroSubtext: { type: String, default: 'Experience luxury dental care with world-class specialists and cutting-edge technology.' },
  phone: { type: String, default: '+1 (800) 555-LUMINA' },
  emergencyPhone: { type: String, default: '+1 (800) 999-DENT' },
  email: { type: String, default: 'concierge@luminadental.com' },
  whatsapp: { type: String, default: '+18005555864' },
  address: { type: String, default: '740 Park Avenue, Suite 12B, New York, NY 10021' },
  openingHours: { type: String, default: 'Mon - Fri: 8:00 AM - 7:00 PM | Sat: 9:00 AM - 4:00 PM' },
  announcementBanner: { type: String, default: '✨ Complimentary Cosmetic Smile Simulation for New Patients' },
  showAnnouncement: { type: Boolean, default: true },
  metaTitle: { type: String, default: 'Lumina Dental Studio | Luxury Dental Excellence' },
  metaDescription: { type: String, default: 'Pinnacle of cosmetic dentistry, dental implants, and porcelain veneers.' }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);

const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // Whitening, Veneers, Implants, Orthodontics, Clinic Facility
  beforeImage: { type: String, default: '' },
  afterImage: { type: String, default: '' },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  isBeforeAfter: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);

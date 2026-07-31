const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  treatment: { type: String, required: true },
  rating: { type: Number, default: 5 },
  comment: { type: String, required: true },
  avatar: { type: String, default: '' },
  isFeatured: { type: Boolean, default: true },
  platform: { type: String, default: 'Google Review' }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);

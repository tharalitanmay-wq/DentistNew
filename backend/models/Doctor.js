const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  bio: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, default: 5.0 },
  consultationFee: { type: Number, required: true },
  availableDays: [{ type: String }],
  timeSlots: [{ type: String }],
  contactEmail: { type: String, default: '' },
  education: [{ type: String }],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Cosmetic, Implants, Orthodontics, General, Surgery, Pediatric
  description: { type: String, required: true },
  priceRange: { type: String, required: true }, // e.g. "$150 - $400"
  estimatedPriceMin: { type: Number, default: 150 },
  estimatedPriceMax: { type: Number, default: 400 },
  duration: { type: String, default: '45 mins' },
  icon: { type: String, default: 'Sparkles' },
  benefits: [{ type: String }],
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);

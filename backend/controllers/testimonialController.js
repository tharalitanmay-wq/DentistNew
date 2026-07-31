const Testimonial = require('../models/Testimonial');
const { getIsConnected } = require('../config/db');
const { seedTestimonials } = require('../utils/seedData');

let memoryTestimonials = [...seedTestimonials];

const getTestimonials = async (req, res) => {
  try {
    if (getIsConnected()) {
      const items = await Testimonial.find();
      if (items.length === 0) return res.json({ success: true, testimonials: seedTestimonials });
      return res.json({ success: true, testimonials: items });
    } else {
      return res.json({ success: true, testimonials: memoryTestimonials });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    if (getIsConnected()) {
      const item = await Testimonial.create(req.body);
      return res.status(201).json({ success: true, testimonial: item });
    } else {
      const newItem = { _id: 'tst-' + Date.now(), ...req.body };
      memoryTestimonials.push(newItem);
      return res.status(201).json({ success: true, testimonial: newItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Testimonial.findByIdAndDelete(id);
    } else {
      memoryTestimonials = memoryTestimonials.filter(t => t._id !== id);
    }
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTestimonials, createTestimonial, deleteTestimonial };

const FAQ = require('../models/FAQ');
const { getIsConnected } = require('../config/db');
const { seedFAQs } = require('../utils/seedData');

let memoryFAQs = [...seedFAQs];

const getFAQs = async (req, res) => {
  try {
    if (getIsConnected()) {
      const faqs = await FAQ.find().sort({ order: 1 });
      if (faqs.length === 0) return res.json({ success: true, faqs: seedFAQs });
      return res.json({ success: true, faqs });
    } else {
      return res.json({ success: true, faqs: memoryFAQs });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createFAQ = async (req, res) => {
  try {
    if (getIsConnected()) {
      const faq = await FAQ.create(req.body);
      return res.status(201).json({ success: true, faq });
    } else {
      const newFaq = { _id: 'faq-' + Date.now(), ...req.body };
      memoryFAQs.push(newFaq);
      return res.status(201).json({ success: true, faq: newFaq });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await FAQ.findByIdAndDelete(id);
    } else {
      memoryFAQs = memoryFAQs.filter(f => f._id !== id);
    }
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFAQs, createFAQ, deleteFAQ };

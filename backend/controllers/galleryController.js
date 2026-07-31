const Gallery = require('../models/Gallery');
const { getIsConnected } = require('../config/db');
const { seedGallery } = require('../utils/seedData');

let memoryGallery = [...seedGallery];

const getGallery = async (req, res) => {
  try {
    if (getIsConnected()) {
      const items = await Gallery.find();
      if (items.length === 0) return res.json({ success: true, items: seedGallery });
      return res.json({ success: true, items });
    } else {
      return res.json({ success: true, items: memoryGallery });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    if (getIsConnected()) {
      const item = await Gallery.create(req.body);
      return res.status(201).json({ success: true, item });
    } else {
      const newItem = { _id: 'gal-' + Date.now(), ...req.body };
      memoryGallery.push(newItem);
      return res.status(201).json({ success: true, item: newItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Gallery.findByIdAndDelete(id);
    } else {
      memoryGallery = memoryGallery.filter(g => g._id !== id);
    }
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getGallery, createGalleryItem, deleteGalleryItem };

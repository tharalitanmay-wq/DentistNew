const Service = require('../models/Service');
const { getIsConnected } = require('../config/db');
const { seedServices } = require('../utils/seedData');

let memoryServices = [...seedServices];

const getServices = async (req, res) => {
  try {
    if (getIsConnected()) {
      const services = await Service.findAll();
      if (services.length === 0) return res.json({ success: true, services: seedServices });
      return res.json({ success: true, services });
    } else {
      return res.json({ success: true, services: memoryServices });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    if (getIsConnected()) {
      const service = await Service.create(req.body);
      return res.status(201).json({ success: true, service });
    } else {
      const newSrv = { id: memoryServices.length + 1, ...req.body };
      memoryServices.push(newSrv);
      return res.status(201).json({ success: true, service: newSrv });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const service = await Service.findByPk(id);
      if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
      await service.update(req.body);
      return res.json({ success: true, service });
    } else {
      const idx = memoryServices.findIndex(s => String(s.id || s._id) === String(id));
      if (idx !== -1) {
        memoryServices[idx] = { ...memoryServices[idx], ...req.body };
        return res.json({ success: true, service: memoryServices[idx] });
      }
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Service.destroy({ where: { id } });
    } else {
      memoryServices = memoryServices.filter(s => String(s.id || s._id) !== String(id));
    }
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getServices, createService, updateService, deleteService };

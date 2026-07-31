const Doctor = require('../models/Doctor');
const { getIsConnected } = require('../config/db');
const { seedDoctors } = require('../utils/seedData');

let memoryDoctors = [...seedDoctors];

const getDoctors = async (req, res) => {
  try {
    if (getIsConnected()) {
      const doctors = await Doctor.find();
      if (doctors.length === 0) return res.json({ success: true, doctors: seedDoctors });
      return res.json({ success: true, doctors });
    } else {
      return res.json({ success: true, doctors: memoryDoctors });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const doctor = await Doctor.findById(id);
      if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
      return res.json({ success: true, doctor });
    } else {
      const doctor = memoryDoctors.find(d => d._id === id);
      if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
      return res.json({ success: true, doctor });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDoctor = async (req, res) => {
  try {
    const data = req.body;
    if (getIsConnected()) {
      const doc = await Doctor.create(data);
      return res.status(201).json({ success: true, doctor: doc });
    } else {
      const newDoc = { _id: 'doc-' + Date.now(), ...data };
      memoryDoctors.push(newDoc);
      return res.status(201).json({ success: true, doctor: newDoc });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      const doc = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
      return res.json({ success: true, doctor: doc });
    } else {
      const idx = memoryDoctors.findIndex(d => d._id === id);
      if (idx !== -1) {
        memoryDoctors[idx] = { ...memoryDoctors[idx], ...req.body };
        return res.json({ success: true, doctor: memoryDoctors[idx] });
      }
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Doctor.findByIdAndDelete(id);
    } else {
      memoryDoctors = memoryDoctors.filter(d => d._id !== id);
    }
    res.json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };

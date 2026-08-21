const { Op, fn, col, where } = require('sequelize');
const Appointment = require('../models/Appointment');
const { getIsConnected } = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const memoryAppointments = [
  {
    id: 1,
    patientName: 'Victoria Sterling-Hayes',
    patientEmail: 'victoria@example.com',
    patientPhone: '+1 (555) 888-9900',
    doctorId: '1',
    doctorName: 'Dr. Evelyn Sterling',
    serviceId: '1',
    serviceName: 'Signature Porcelain Veneers',
    date: '2026-08-05',
    timeSlot: '11:00 AM',
    notes: 'Consultation for 8 upper veneers and smile simulation.',
    status: 'Confirmed',
    userId: '1',
    reportFile: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    patientName: 'Harrison Ford-Blake',
    patientEmail: 'harrison@example.com',
    patientPhone: '+1 (555) 777-6655',
    doctorId: '2',
    doctorName: 'Dr. Julian Vance',
    serviceId: '2',
    serviceName: '3D Computer-Guided Dental Implants',
    date: '2026-08-10',
    timeSlot: '02:00 PM',
    notes: 'Single molar implant consultation with 3D CBCT scan review.',
    status: 'Pending',
    userId: '1',
    reportFile: '',
    createdAt: new Date().toISOString()
  }
];

const createAppointment = async (req, res) => {
  try {
    const { patientName, patientEmail, patientPhone, doctorName, serviceName, date, timeSlot, notes, doctorId, serviceId } = req.body;

    if (!patientName || !patientEmail || !patientPhone || !doctorName || !serviceName || !date || !timeSlot) {
      return res.status(400).json({ success: false, message: 'Please provide all required appointment fields' });
    }

    let reportFile = '';
    if (req.file) {
      if (req.file.filename) {
        reportFile = '/uploads/' + req.file.filename;
      } else if (req.file.buffer) {
        const ext = path.extname(req.file.originalname || '') || '.pdf';
        const fileName = `report-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${ext}`;
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadDir, fileName), req.file.buffer);
        reportFile = '/uploads/' + fileName;
      }
    }

    // Try decoding auth token if passed in Authorization header
    let decodedUser = req.user;
    const authHeader = req.headers.authorization;
    if (!decodedUser && authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        decodedUser = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        // ignore token decode errors
      }
    }

    const userId = decodedUser ? String(decodedUser.id) : '';
    const cleanEmail = patientEmail.trim().toLowerCase();

    if (getIsConnected()) {
      const appt = await Appointment.create({
        patientName: patientName.trim(),
        patientEmail: cleanEmail,
        patientPhone: patientPhone.trim(),
        doctorId: doctorId ? String(doctorId) : '',
        doctorName: doctorName.trim(),
        serviceId: serviceId ? String(serviceId) : '',
        serviceName: serviceName.trim(),
        date,
        timeSlot,
        notes: notes || '',
        reportFile,
        userId,
        status: 'Pending'
      });
      return res.status(201).json({ success: true, message: 'Appointment booked successfully!', appointment: appt });
    } else {
      const newAppt = {
        id: memoryAppointments.length + 1,
        patientName: patientName.trim(),
        patientEmail: cleanEmail,
        patientPhone: patientPhone.trim(),
        doctorId: doctorId ? String(doctorId) : '',
        doctorName: doctorName.trim(),
        serviceId: serviceId ? String(serviceId) : '',
        serviceName: serviceName.trim(),
        date,
        timeSlot,
        notes: notes || '',
        reportFile,
        status: 'Pending',
        userId,
        createdAt: new Date().toISOString()
      };
      memoryAppointments.unshift(newAppt);
      return res.status(201).json({ success: true, message: 'Appointment booked successfully!', appointment: newAppt });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user ? String(req.user.id) : '';
    const userEmail = req.user && req.user.email ? req.user.email.trim().toLowerCase() : '';
    const userName = req.user && req.user.name ? req.user.name.trim().toLowerCase() : '';

    if (getIsConnected()) {
      const appts = await Appointment.findAll({
        where: {
          [Op.or]: [
            ...(userId ? [{ userId: userId }] : []),
            ...(userEmail ? [where(fn('LOWER', col('patientEmail')), userEmail)] : []),
            ...(userName ? [where(fn('LOWER', col('patientName')), userName)] : [])
          ]
        },
        order: [['createdAt', 'DESC']]
      });
      return res.json({ success: true, appointments: appts });
    } else {
      const appts = memoryAppointments.filter(a => 
        (userId && String(a.userId) === userId) ||
        (userEmail && a.patientEmail && a.patientEmail.toLowerCase() === userEmail) ||
        (userName && a.patientName && a.patientName.toLowerCase() === userName)
      );
      return res.json({ success: true, appointments: appts });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    if (getIsConnected()) {
      const appts = await Appointment.findAll({
        order: [['createdAt', 'DESC']]
      });
      return res.json({ success: true, appointments: appts });
    } else {
      return res.json({ success: true, appointments: memoryAppointments });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, doctorName, prescription } = req.body;

    if (getIsConnected()) {
      const updateData = {};
      if (status) updateData.status = status;
      if (doctorName) updateData.doctorName = doctorName;
      if (prescription) updateData.prescription = prescription;

      const appt = await Appointment.findByPk(id);
      if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' });
      await appt.update(updateData);
      return res.json({ success: true, message: 'Appointment updated successfully', appointment: appt });
    } else {
      const appt = memoryAppointments.find(a => String(a.id) === String(id));
      if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' });
      if (status) appt.status = status;
      if (doctorName) appt.doctorName = doctorName;
      if (prescription) appt.prescription = prescription;
      return res.json({ success: true, message: 'Appointment updated successfully', appointment: appt });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      await Appointment.destroy({ where: { id } });
    } else {
      const idx = memoryAppointments.findIndex(a => String(a.id) === String(id));
      if (idx !== -1) memoryAppointments.splice(idx, 1);
    }
    res.json({ success: true, message: 'Appointment removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createAppointment, getMyAppointments, getAllAppointments, updateAppointmentStatus, deleteAppointment };

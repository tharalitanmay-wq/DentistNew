const Appointment = require('../models/Appointment');
const { getIsConnected } = require('../config/db');

const memoryAppointments = [
  {
    _id: 'app-101',
    patientName: 'Victoria Sterling-Hayes',
    patientEmail: 'victoria@example.com',
    patientPhone: '+1 (555) 888-9900',
    doctorId: 'doc-1',
    doctorName: 'Dr. Evelyn Sterling',
    serviceId: 'srv-1',
    serviceName: 'Signature Porcelain Veneers',
    date: '2026-08-05',
    timeSlot: '11:00 AM',
    notes: 'Consultation for 8 upper veneers and smile simulation.',
    status: 'Confirmed',
    userId: 'usr-patient-1',
    reportFile: '',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'app-102',
    patientName: 'Harrison Ford-Blake',
    patientEmail: 'harrison@example.com',
    patientPhone: '+1 (555) 777-6655',
    doctorId: 'doc-2',
    doctorName: 'Dr. Julian Vance',
    serviceId: 'srv-2',
    serviceName: '3D Computer-Guided Dental Implants',
    date: '2026-08-10',
    timeSlot: '02:00 PM',
    notes: 'Single molar implant consultation with 3D CBCT scan review.',
    status: 'Pending',
    userId: 'usr-patient-2',
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
      reportFile = '/uploads/' + req.file.filename;
    }

    const userId = req.user ? req.user.id : '';

    if (getIsConnected()) {
      const appt = await Appointment.create({
        patientName,
        patientEmail,
        patientPhone,
        doctorId: doctorId || '',
        doctorName,
        serviceId: serviceId || '',
        serviceName,
        date,
        timeSlot,
        notes: notes || '',
        reportFile,
        userId
      });
      return res.status(201).json({ success: true, message: 'Appointment booked successfully!', appointment: appt });
    } else {
      const newAppt = {
        _id: 'app-' + Date.now(),
        patientName,
        patientEmail,
        patientPhone,
        doctorId: doctorId || '',
        doctorName,
        serviceId: serviceId || '',
        serviceName,
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
    const userId = req.user.id;
    const userEmail = req.user.email;

    if (getIsConnected()) {
      const appts = await Appointment.find({
        $or: [{ userId: userId }, { patientEmail: userEmail }]
      }).sort({ createdAt: -1 });
      return res.json({ success: true, appointments: appts });
    } else {
      const appts = memoryAppointments.filter(a => a.userId === userId || a.patientEmail === userEmail);
      return res.json({ success: true, appointments: appts });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    if (getIsConnected()) {
      const appts = await Appointment.find().sort({ createdAt: -1 });
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

      const appt = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
      if (!appt) return res.status(404).json({ success: false, message: 'Appointment not found' });
      return res.json({ success: true, message: 'Appointment updated successfully', appointment: appt });
    } else {
      const appt = memoryAppointments.find(a => a._id === id);
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
      await Appointment.findByIdAndDelete(id);
    } else {
      const idx = memoryAppointments.findIndex(a => a._id === id);
      if (idx !== -1) memoryAppointments.splice(idx, 1);
    }
    res.json({ success: true, message: 'Appointment removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createAppointment, getMyAppointments, getAllAppointments, updateAppointmentStatus, deleteAppointment };

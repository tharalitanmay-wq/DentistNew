const express = require('express');
const router = express.Router();
const { createAppointment, getMyAppointments, getAllAppointments, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointmentController');
const { authenticate, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public or Patient authenticated creation with file report attachment option
router.post('/', upload.single('reportFile'), createAppointment);

// Patient view appointments
router.get('/my', authenticate, getMyAppointments);

// Admin view & update appointments
router.get('/all', authenticate, requireRole('admin', 'staff', 'doctor'), getAllAppointments);
router.put('/:id', authenticate, requireRole('admin', 'staff', 'doctor'), updateAppointmentStatus);
router.delete('/:id', authenticate, requireRole('admin'), deleteAppointment);

module.exports = router;

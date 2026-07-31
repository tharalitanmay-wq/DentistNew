const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post('/', authenticate, requireRole('admin'), createDoctor);
router.put('/:id', authenticate, requireRole('admin'), updateDoctor);
router.delete('/:id', authenticate, requireRole('admin'), deleteDoctor);

module.exports = router;

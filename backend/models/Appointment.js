const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientPhone: { type: String, required: true },
  doctorId: { type: String, default: '' },
  doctorName: { type: String, required: true },
  serviceId: { type: String, default: '' },
  serviceName: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  notes: { type: String, default: '' },
  reportFile: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  userId: { type: String, default: '' },
  prescription: { type: String, default: '' },
  paymentStatus: { type: String, enum: ['Unpaid', 'Paid', 'Insurance Pending'], default: 'Unpaid' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patientEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patientPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doctorId: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  doctorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serviceId: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  serviceName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  reportFile: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled'),
    defaultValue: 'Pending'
  },
  userId: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  prescription: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  paymentStatus: {
    type: DataTypes.ENUM('Unpaid', 'Paid', 'Insurance Pending'),
    defaultValue: 'Unpaid'
  }
}, {
  tableName: 'appointments',
  timestamps: true
});

module.exports = Appointment;

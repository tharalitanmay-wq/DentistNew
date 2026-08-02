const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0
  },
  consultationFee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availableDays: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  timeSlots: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  contactEmail: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  education: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

module.exports = Doctor;

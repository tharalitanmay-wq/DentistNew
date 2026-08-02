const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  treatment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  platform: {
    type: DataTypes.STRING,
    defaultValue: 'Google Review'
  }
}, {
  timestamps: true
});

module.exports = Testimonial;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const WalkInQueue = sequelize.define('WalkInQueue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patientNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tokenNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isTreated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = WalkInQueue;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FAQ = sequelize.define('FAQ', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'General'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

module.exports = FAQ;

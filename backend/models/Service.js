const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  priceRange: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estimatedPriceMin: {
    type: DataTypes.INTEGER,
    defaultValue: 150
  },
  estimatedPriceMax: {
    type: DataTypes.INTEGER,
    defaultValue: 400
  },
  duration: {
    type: DataTypes.STRING,
    defaultValue: '45 mins'
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: 'Sparkles'
  },
  benefits: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

module.exports = Service;

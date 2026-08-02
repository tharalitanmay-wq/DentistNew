const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  beforeImage: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  afterImage: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  isBeforeAfter: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Gallery;

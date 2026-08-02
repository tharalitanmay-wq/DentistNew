const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: 'Dr. Evelyn Sterling'
  },
  readTime: {
    type: DataTypes.STRING,
    defaultValue: '5 min read'
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  timestamps: true
});

module.exports = Blog;

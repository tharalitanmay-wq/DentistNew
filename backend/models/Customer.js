const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_image_key: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
}, {
  tableName: 'customers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  hooks: {
    beforeCreate: async (cust) => {
      if (cust.password && !cust.password.startsWith('$2a$') && !cust.password.startsWith('$2b$')) {
        const salt = await bcrypt.genSalt(10);
        cust.password = await bcrypt.hash(cust.password, salt);
      }
    },
    beforeUpdate: async (cust) => {
      if (cust.changed('password') && !cust.password.startsWith('$2a$') && !cust.password.startsWith('$2b$')) {
        const salt = await bcrypt.genSalt(10);
        cust.password = await bcrypt.hash(cust.password, salt);
      }
    }
  }
});

Customer.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = Customer;

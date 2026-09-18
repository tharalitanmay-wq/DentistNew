const { Sequelize } = require('sequelize');

const dbHost = process.env.MYSQL_HOST || '127.0.0.1';
const dbPort = parseInt(process.env.MYSQL_PORT || '3306', 10);
const dbUser = process.env.MYSQL_USER || 'root';
const dbPassword = process.env.MYSQL_PASSWORD || '';
const dbName = process.env.MYSQL_DATABASE || 'pearl_dental';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    // Auto-create database if not exists using Sequelize
    const rootSequelize = new Sequelize('', dbUser, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: 'mysql',
      logging: false
    });
    await rootSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await rootSequelize.close();

    await sequelize.authenticate();

    // Import models to ensure Sequelize knows about customers and admins tables
    require('../models/Customer');
    require('../models/Admin');
    require('../models/User');
    require('../models/Doctor');
    require('../models/Service');
    require('../models/Appointment');
    require('../models/Blog');

    await sequelize.sync({ alter: true });
    isConnected = true;
    console.log(`[MySQL Database] Connected successfully to ${dbHost}:${dbPort}/${dbName}`);

    // Seed default users if tables are empty
    try {
      const Customer = require('../models/Customer');
      const Admin = require('../models/Admin');
      const bcrypt = require('bcryptjs');
      const defaultHash = await bcrypt.hash('AdminPass123!', 10);

      const customerCount = await Customer.count();
      if (customerCount === 0) {
        await Customer.bulkCreate([
          {
            name: 'Johnathan Miller',
            username: 'jmiller',
            email: 'patient@example.com',
            phone: '+1 (555) 234-5678',
            password: defaultHash
          },
          {
            name: 'Sahil',
            username: 'sahil',
            email: 'sahil@gmail.com',
            phone: '+1 (555) 999-8888',
            password: defaultHash
          }
        ]);
        console.log('[MySQL Database] Default customer accounts seeded successfully.');
      }

      const adminCount = await Admin.count();
      if (adminCount === 0) {
        await Admin.create({
          name: 'Master Admin',
          username: 'admin',
          email: 'admin@pearldental.com',
          password: defaultHash
        });
        console.log('[MySQL Database] Default admin account seeded successfully.');
      }
    } catch (seedErr) {
      console.warn('[MySQL Warning] Auto-seed skipped:', seedErr.message);
    }
  } catch (error) {
    console.warn(`[MySQL Warning] Could not connect to MySQL (${error.message}). Operating in in-memory fallback mode.`);
    isConnected = false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { sequelize, connectDB, getIsConnected };

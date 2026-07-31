const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lumina_dental';
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected to ${mongoose.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB (${error.message}). Running in mock fallback mode.`);
    isConnected = false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };

const mongoose = require('mongoose');
const os = require('os');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    return {
      host: conn.connection.host,
      name: conn.connection.name,
      mongoose: mongoose.version,
      node: process.version,
      os: `${os.platform()} (${os.arch()})`,
      memory: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(1)} MB`,
      time: new Date().toLocaleString()
    };
  } catch (error) {
    throw new Error(`MongoDB Connection Failed: ${error.message}`);
  }
};

module.exports = connectDB;

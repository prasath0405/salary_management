const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this is at the top

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_salary_db';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
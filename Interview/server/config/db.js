const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('MONGODB_URL:', process.env.MONGODB_URL); // Debug log
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
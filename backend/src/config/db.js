import mongoose from 'mongoose';

/**
 * @desc    Connect to MongoDB using URI from environment variables
 */
const connectDB = async () => {
  try {
    // Standard Mongoose connection using the MONGO_URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Colored console log (Green) to confirm connection
    console.log(`\x1b[32m%s\x1b[0m`, `✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// ✅ ESM export for server.js to use 'import connectDB from ...'
export default connectDB;
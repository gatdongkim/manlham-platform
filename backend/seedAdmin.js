import mongoose from 'mongoose';
import dotenv from 'dotenv';
// ✅ Note: In ES Modules, you often need the .js extension in the path
import User from './src/apps/users/user.model.js'; 

dotenv.config();

const ADMIN_EMAIL = "mts.manlham@gmail.com";

const seedAdmin = async () => {
  try {
    // Ensure MONGODB_URI exists in your .env
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("📡 Connected to MongoDB...");

    const adminExists = await User.findOne({ email: ADMIN_EMAIL });
    
    if (adminExists) {
        console.log(`⚠️ Admin (${ADMIN_EMAIL}) already exists!`);
        process.exit(0);
    }

    const admin = new User({
      name: "Super Admin",
      email: ADMIN_EMAIL,
      password: "gatdong@manlham-tech", // Model pre-save hook will hash this
      role: "ADMIN",
      isProfileComplete: true,
      isVerified: true
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log(`📧 Email: ${ADMIN_EMAIL}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();
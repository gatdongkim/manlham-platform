import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/apps/users/user.model.js'; 

dotenv.config();

const seed = async () => {
    try {
        // ✅ CHANGED: Now using MONGO_URI to match your .env
        const uri = process.env.MONGO_URI; 

        if (!uri) {
            throw new Error("MONGO_URI is missing from your .env file");
        }

        await mongoose.connect(uri);
        console.log("Connected to MongoDB Atlas...");

        // ⚠️ ENTER YOUR ACTUAL EMAIL HERE to receive the reset link
        const testEmail = "mts.manlham@gmail.com"; 

        await User.deleteOne({ email: testEmail });

        const user = new User({
            name: "Manlham Admin",
            email: testEmail,
            password: "OldPassword123!", 
            role: "ADMIN",
            isVerified: true
        });

        await user.save();
        console.log("--------------------------------------------------");
        console.log("✅ SUCCESS: Test user created!");
        console.log(`📧 Email: ${testEmail}`);
        console.log("Go to /forgot-password on your frontend to test now.");
        console.log("--------------------------------------------------");
        
        process.exit(0);
    } catch (err) {
        console.error("❌ SEED ERROR:", err.message);
        process.exit(1);
    }
};

seed();
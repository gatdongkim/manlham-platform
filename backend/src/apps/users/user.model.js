import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true, 
        lowercase: true,
        trim: true 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
        minlength: 8, 
        select: false 
    },
    role: { 
        type: String, 
        enum: ['MSME', 'PRO', 'ADMIN', 'STAFF'], 
        default: 'PRO',
        uppercase: true // Ensures "pro" becomes "PRO" to match the enum
    },
    phoneNumber: { 
        type: String,
        trim: true 
    },
    // Matches Client Signup
    clientType: { 
        type: String,
        enum: ['INDIVIDUAL', 'COMPANY', 'ORGANIZATION', ''], 
        uppercase: true,
        default: ''
    },
    location: { 
        type: String,
        trim: true 
    },
    // Matches Student Signup
    institutionType: { 
        type: String,
        enum: ['UNIVERSITY', 'COLLEGE', 'SECONDARY', ''],
        uppercase: true,
        default: ''
    },
    about: { 
        type: String,
        trim: true 
    },
    skills: {
        type: [String],
        default: []
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    verificationToken: String, 
    passwordResetToken: String,
    passwordResetExpires: Date,
    isProfileComplete: { 
        type: Boolean, 
        default: false 
    },
}, { 
    timestamps: true,
    // This ensures virtuals are included if you convert to JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// ✅ Password hashing middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// ✅ Method to compare passwords
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
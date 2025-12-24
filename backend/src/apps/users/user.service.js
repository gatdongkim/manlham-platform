import User from './user.model.js';
import jwt from 'jsonwebtoken';

/**
 * @desc    Handle user registration
 */
export const registerUser = async (userData) => {
    // 1. Normalize Email
    const normalizedEmail = userData.email.toLowerCase().trim();

    // 2. Check if user already exists
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
        throw new Error("An account with this email already exists.");
    }

    // 3. Data Mapping & Cleanup
    // We explicitly map 'phone' (from frontend) to 'phoneNumber' (in schema)
    const finalData = {
        ...userData,
        email: normalizedEmail,
        phoneNumber: userData.phoneNumber || userData.phone,
        // Ensure skills is always an array to prevent schema errors
        skills: Array.isArray(userData.skills) ? userData.skills : []
    };

    // 4. Create the user
    // The .create() method triggers the user.model.js hashing middleware
    const user = await User.create(finalData);

    return user;
};

/**
 * @desc    Handle user login and token generation
 */
export const loginUser = async ({ email, password }) => {
    const normalizedEmail = email.toLowerCase().trim();
    
    // 1. Find user + password
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // 2. Compare passwords
    const isMatch = await user.correctPassword(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // 3. Check Verification Status
    if (!user.isVerified) {
        throw new Error("Please verify your email before logging in.");
    }

    // 4. Generate JWT
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'super_secure_jwt_secret',
        { expiresIn: process.env.JWT_EXPIRES || '7d' }
    );

    // 5. Clean up for response
    const userObject = user.toObject();
    delete userObject.password;
    
    return { token, user: userObject };
};
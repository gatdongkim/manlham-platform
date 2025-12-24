import User from '../users/user.model.js'; 
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/**
 * @desc Helper to generate JWT
 */
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role }, 
        process.env.JWT_SECRET || 'super_secure_jwt_secret', 
        { expiresIn: process.env.JWT_EXPIRES || '7d' }
    );
};

/**
 * @route POST /api/v1/auth/register
 */
export const register = async (req, res) => {
    try {
        const { name, email, password, role, clientType, location, phone, institutionType, about, skills } = req.body;
        
        console.log(`[AUTH] 🚀 Registering: ${email} | Role input: ${role}`);

        // 1. Updated Role Mapping (Fixes the STAFF/PRO bug)
        let assignedRole = 'PRO'; 
        const normalizedRole = role ? role.toUpperCase() : 'PRO';

        if (normalizedRole === 'CLIENT' || normalizedRole === 'MSME') {
            assignedRole = 'MSME';
        } else if (normalizedRole === 'STAFF') {
            assignedRole = 'STAFF'; // ✅ Now correctly assigns STAFF role
        } else if (normalizedRole === 'ADMIN') {
            assignedRole = 'ADMIN'; // ✅ Now correctly assigns ADMIN role
        } else {
            assignedRole = 'PRO';   // Default for Students
        }

        // 2. ClientType Normalization
        let assignedClientType = '';
        if (assignedRole === 'MSME' && clientType) {
            assignedClientType = clientType.toUpperCase();
        }

        // 3. Save to MongoDB
        const user = await User.create({
            name: (name || '').trim(),
            email: (email || '').toLowerCase().trim(),
            password,
            role: assignedRole,
            clientType: assignedClientType,
            location: location || '',
            phoneNumber: phone || '',
            institutionType: assignedRole === 'PRO' ? (institutionType || '').toUpperCase() : '',
            about: about || '',
            skills: skills || [],
            isVerified: true, // Bypass verification for immediate testing
            verificationToken: null 
        });

        console.log(`[AUTH] ✅ User saved to DB. ID: ${user._id} | Role: ${user.role}`);

        res.status(201).json({
            status: 'success',
            message: 'Registration successful! Proceed to login.',
            user: { id: user._id, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error(`[AUTH] ❌ Registration Failed:`, error.message);
        if (error.code === 11000) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }
        res.status(400).json({ message: error.message });
    }
};

/**
 * @route POST /api/v1/auth/login
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const normalizedEmail = String(email).toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Email not verified.' });
        }

        const token = generateToken(user);
        console.log(`[AUTH] 🔓 Login Success: ${user.email} (${user.role})`);

        res.json({
            token,
            user: { 
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role 
            }
        });
    } catch (error) {
        console.error(`[AUTH] ❌ Login Error:`, error.message);
        res.status(500).json({ message: error.message });
    }
};

// ... (verifyEmail, forgotPassword, resetPassword, resendVerification remain the same)
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(400).json({ message: "Invalid or expired token." });
        user.isVerified = true;
        user.verificationToken = undefined; 
        await user.save();
        res.status(200).json({ message: "Verified!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: (email || '').toLowerCase().trim() });
        if (!user) return res.status(404).json({ message: "Not found." });
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 3600000;
        await user.save();
        res.status(200).json({ message: "Token generated." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const user = await User.findOne({ 
            passwordResetToken: token, 
            passwordResetExpires: { $gt: Date.now() } 
        });
        if (!user) return res.status(400).json({ message: "Expired/Invalid." });
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resendVerification = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: (email || '').toLowerCase().trim(), isVerified: false });
        if (!user) return res.status(404).json({ message: "Not found." });
        res.status(200).json({ message: "Sent." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
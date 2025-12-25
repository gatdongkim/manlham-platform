import User from './user.model.js';

/**
 * @desc    Get all users for Admin Identity Management
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res) => {
    try {
        // 1. Fetch all users from the database
        // 2. Exclude passwords for security
        // 3. Sort by newest registration first
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        // 4. Return data in a format compatible with your frontend table
        res.status(200).json({ 
            success: true, 
            count: users.length, 
            data: users 
        });
    } catch (error) {
        console.error("❌ Admin User Fetch Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve user identity list" 
        });
    }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/users/me
 */
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update user details
 * @route   PUT /api/v1/users/update
 */
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
            runValidators: true,
        }).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
import User from '../users/user.model.js';
import Application from '../applications/application.model.js';

/**
 * @desc Get summary stats for the Student/Professional dashboard
 * ✅ Matches the 'getDashboardSummary' import in your routes
 */
export const getDashboardSummary = async (req, res) => {
    try {
        const studentId = req.user.id;

        const totalApplications = await Application.countDocuments({ professional: studentId });
        const acceptedApplications = await Application.countDocuments({ 
            professional: studentId, 
            status: 'ACCEPTED' 
        });
        
        // Find recent applications to show on dashboard
        const recentApplications = await Application.find({ professional: studentId })
            .populate('job', 'title budget')
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalApplications,
                acceptedApplications,
                recentApplications
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc Get profile details for the logged-in student
 * ✅ Matches the 'getProfile' import
 */
export const getProfile = async (req, res) => {
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
 * @desc Update student profile and handle vetting document
 * ✅ Matches the 'updateProfile' import
 */
export const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        
        // If a file was uploaded via multer, save the path
        if (req.file) {
            updates.verificationDoc = req.file.path;
            updates.isVerified = false; // Reset verification if they update docs
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
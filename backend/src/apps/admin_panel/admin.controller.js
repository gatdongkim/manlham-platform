import User from '../users/user.model.js';
import Job from '../jobs/job.model.js';
import Application from '../applications/application.model.js';

/**
 * @desc    Get platform-wide statistics
 * ✅ Updated to match the "6 Users" count in your MongoDB
 */
export const getStats = async (req, res) => {
    try {
        // Count total users to ensure the dashboard doesn't show 0
        const totalUsers = await User.countDocuments(); 
        const totalStudents = await User.countDocuments({ role: 'PRO' });
        const totalClients = await User.countDocuments({ role: 'MSME' });
        
        // Fetch all jobs for the "Global Listings" card
        const totalJobs = await Job.countDocuments();
        const activeJobs = await Job.countDocuments({ status: 'OPEN' });
        
        res.status(200).json({
            success: true,
            data: { 
                totalUsers, // This should now return 6
                totalStudents, 
                totalClients, 
                totalJobs, 
                activeJobs 
            }
        });
    } catch (error) {
        console.error("❌ Stats Fetch Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all users (Students & Clients)
 * ✅ Populates the "Identity" page
 */
export const users = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: allUsers.length, data: allUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ... keep other functions (getVerificationQueue, vetProfessional, etc.) as they are
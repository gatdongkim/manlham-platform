import User from '../users/user.model.js';
import Job from '../jobs/job.model.js';
import Application from '../applications/application.model.js';

/**
 * @desc    Get platform-wide statistics
 */
export const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments(); 
        const totalStudents = await User.countDocuments({ role: 'PRO' });
        const totalClients = await User.countDocuments({ role: 'MSME' });
        const totalJobs = await Job.countDocuments();
        const activeJobs = await Job.countDocuments({ status: 'OPEN' });
        
        res.status(200).json({
            success: true,
            data: { totalUsers, totalStudents, totalClients, totalJobs, activeJobs }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all users (Populates Identity Page)
 */
export const users = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: allUsers.length, data: allUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all disputed jobs
 * ✅ FIX: Added missing export for admin.routes.js
 */
export const getAllDisputes = async (req, res) => {
    try {
        const disputes = await Job.find({ status: 'DISPUTED' })
            .populate('client', 'name email')
            .populate('professional', 'name email');
        res.status(200).json({ success: true, data: disputes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Fetch pending verifications
 */
export const getVerificationQueue = async (req, res) => {
    try {
        const queue = await User.find({ role: 'PRO', isVerified: false });
        res.status(200).json({ success: true, data: queue });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Approve/Vet a professional
 */
export const vetProfessional = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
        res.status(200).json({ success: true, message: "Professional verified" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Resolve dispute
 */
export const resolveDispute = async (req, res) => {
    try {
        const { resolution } = req.body;
        const job = await Job.findByIdAndUpdate(req.params.jobId, { 
            status: resolution === 'RELEASE' ? 'COMPLETED' : 'CANCELLED' 
        });
        res.status(200).json({ success: true, message: "Dispute resolved" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    System audit logs
 */
export const getAuditLogs = async (req, res) => {
    res.status(200).json({ success: true, data: [] });
};
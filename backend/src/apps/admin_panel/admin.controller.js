import User from '../users/user.model.js';
import Job from '../jobs/job.model.js';
import Application from '../applications/application.model.js';

/**
 * @desc    Get platform-wide statistics
 */
export const getStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'PRO' });
        const totalClients = await User.countDocuments({ role: 'MSME' });
        const activeJobs = await Job.countDocuments({ status: 'OPEN' });
        
        res.status(200).json({
            success: true,
            data: { totalStudents, totalClients, activeJobs }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all users (Students & Clients)
 */
export const users = async (req, res) => {
    try {
        const allUsers = await User.find().select('-password');
        res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Fetch pending professional verifications
 */
export const getVerificationQueue = async (req, res) => {
    try {
        // Assuming students have a 'isVerified' field
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
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            { isVerified: true }, 
            { new: true }
        );
        res.status(200).json({ success: true, message: "Professional verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all disputed jobs (Escrow holds)
 * ✅ THIS FIXES THE SyntaxError IN YOUR ROUTES
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
 * @desc    Resolve an Escrow dispute
 */
export const resolveDispute = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { resolution } = req.body; // e.g., 'REFUND_CLIENT' or 'RELEASE_TO_PRO'

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        job.status = resolution === 'RELEASE_TO_PRO' ? 'COMPLETED' : 'CANCELLED';
        job.paymentStatus = resolution === 'RELEASE_TO_PRO' ? 'RELEASED' : 'REFUNDED';
        await job.save();

        res.status(200).json({ success: true, message: `Dispute resolved: ${resolution}` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get system audit logs
 */
export const getAuditLogs = async (req, res) => {
    // Placeholder for actual logging logic
    res.status(200).json({ success: true, data: [] });
};
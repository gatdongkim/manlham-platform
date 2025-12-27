import express from 'express';
import mongoose from 'mongoose';
import Job from '../apps/jobs/job.model.js'; 

const router = express.Router();

/**
 * @desc    Get client-specific stats
 * @route   GET /api/v1/jobs/client-stats
 */
router.get('/client-stats', async (req, res) => {
    try {
        const clientId = "658af1234567890abcdef123"; // Gatdong Kim's ID
        const jobs = await Job.find({ client: clientId });
        
        const stats = {
            activeJobs: jobs.filter(j => j.status === 'OPEN' || j.status === 'active' || !j.status).length,
            pendingBids: 0, 
            completedJobs: jobs.filter(j => j.status === 'COMPLETED').length,
            totalSpent: jobs.reduce((sum, j) => sum + (Number(j.budget) || 0), 0)
        };
        
        res.json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ message: "Error calculating stats" });
    }
});

/**
 * @desc    Get jobs for the specific client
 * @route   GET /api/v1/jobs/client
 */
router.get('/client', async (req, res) => {
    try {
        const clientId = "658af1234567890abcdef123";
        const jobs = await Job.find({ client: clientId }).sort({ createdAt: -1 });
        res.json({ success: true, data: jobs });
    } catch (err) {
        res.status(500).json({ message: "Error fetching client jobs" });
    }
});

/**
 * @desc    Create a new job
 */
router.post('/', async (req, res) => {
    try {
        const newJob = new Job({
            ...req.body,
            client: "658af1234567890abcdef123" 
        });
        const savedJob = await newJob.save();
        res.status(201).json({ success: true, data: savedJob });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @desc    Get all jobs (Marketplace)
 */
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().populate('client', 'name email').sort({ createdAt: -1 });
        res.json({ success: true, data: jobs });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * @desc    Get a single job (KEEP THIS LAST)
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });
        const job = await Job.findById(id).populate('client', 'name email');
        if (!job) return res.status(404).json({ message: "Not found" });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: "Error" });
    }
});

export default router;
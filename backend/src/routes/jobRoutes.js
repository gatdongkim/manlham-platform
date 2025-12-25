import express from 'express';
import mongoose from 'mongoose';
import Job from '../apps/jobs/job.model.js'; 

const router = express.Router();

/**
 * @desc    Get all jobs (Fixes the 404 in Admin Dashboard)
 * @route   GET /api/v1/jobs
 */
router.get('/', async (req, res) => {
    try {
        // Fetch all jobs and populate client details
        const jobs = await Job.find().populate('client', 'name email').sort({ createdAt: -1 });
        
        // Wrap in a 'data' object to match your Dashboard.jsx frontend logic
        res.json({ success: true, data: jobs });
    } catch (err) {
        console.error("❌ Failed to fetch jobs:", err);
        res.status(500).json({ message: "Server error fetching jobs" });
    }
});

/**
 * @desc    Get a single job by ID
 * @route   GET /api/v1/jobs/:id
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Job ID format" });
        }

        const job = await Job.findById(id)
            .populate('client', 'name email')
            .populate('professional', 'name email');
        
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        res.json(job);
    } catch (err) {
        console.error("❌ Fetch Error:", err);
        res.status(500).json({ message: "Error fetching job details" });
    }
});

export default router;
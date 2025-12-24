import express from 'express';
import mongoose from 'mongoose';
// ✅ Path verified: ensure this points to your specific folder structure
import Job from '../apps/jobs/job.model.js'; 

const router = express.Router();

/**
 * @desc    Get a single job by ID with populated client/professional details
 * @route   GET /api/v1/job-details/:id
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Validate if the ID is a valid MongoDB ObjectId to prevent crash
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Job ID format" });
        }

        // 2. Fetch job and populate 'client' (MSME) 
        // Note: If your model uses 'professional', we populate that too
        const job = await Job.findById(id)
            .populate('client', 'name email')
            .populate('professional', 'name email');
        
        if (!job) {
            return res.status(404).json({ message: "Job not found in Nexus database" });
        }
        
        res.json(job);
    } catch (err) {
        console.error("❌ Workspace Fetch Error:", err);
        res.status(500).json({ message: "Internal Server Error fetching job details" });
    }
});

export default router;
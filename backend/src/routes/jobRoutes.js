import express from 'express';
import mongoose from 'mongoose';
import Job from '../apps/jobs/job.model.js'; 

const router = express.Router();

/**
 * @desc    Create a new job
 * @route   POST /api/v1/jobs
 */
router.post('/', async (req, res) => {
    try {
        const { title, description, budget, currency, category, deadline, location, skills } = req.body;

        // Create the job object
        const newJob = new Job({
            title,
            description,
            budget,
            currency,
            category,
            deadline,
            location,
            skills,
            // Ensure this matches your User ID for Gatdong Kim
            client: req.body.clientId || "658af1234567890abcdef123" 
        });

        const savedJob = await newJob.save();
        res.status(201).json({ success: true, data: savedJob });
    } catch (err) {
        console.error("❌ Failed to create job:", err);
        res.status(400).json({ message: err.message || "Failed to create job" });
    }
});

/**
 * @desc    Get all jobs
 * @route   GET /api/v1/jobs
 */
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().populate('client', 'name email').sort({ createdAt: -1 });
        res.json({ success: true, data: jobs });
    } catch (err) {
        res.status(500).json({ message: "Server error fetching jobs" });
    }
});

/**
 * @desc    Get a single job by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const job = await Job.findById(id).populate('client', 'name email');
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: "Error fetching job" });
    }
});

export default router;
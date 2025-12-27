import express from 'express';
import { 
    users, 
    getStats, 
    getVerificationQueue, 
    getAllDisputes 
} from '../apps/admin_panel/admin.controller.js'; // Ensure path is correct
import Application from '../apps/applications/application.model.js';
import Job from '../apps/jobs/job.model.js';

const router = express.Router();

/**
 * ✅ IDENTITY PAGE FIX
 * This handles GET /api/v1/admin/users
 */
router.get('/users', users);

/**
 * ✅ CONTROL PANEL STATS FIX
 * This handles GET /api/v1/admin/stats
 */
router.get('/stats', getStats);

// Vetting & Disputes
router.get('/verification-queue', getVerificationQueue);
router.get('/disputes', getAllDisputes);

// Existing Application Routes
router.get('/applications', async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('student', 'name')
            .populate('job', 'title budget');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: "Error fetching applications" });
    }
});

router.patch('/applications/:id', async (req, res) => {
    const { status } = req.body;
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );

        if (status === 'ACCEPTED') {
            await Job.findByIdAndUpdate(application.job, { 
                status: 'IN_PROGRESS',
                selectedStudent: application.student 
            });
        }
        res.json({ message: `Application ${status.toLowerCase()}` });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

export default router;
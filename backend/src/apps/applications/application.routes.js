import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { 
    applyToJob, 
    getJobApplications, 
    updateApplicationStatus,
    getStudentApplications // ✅ Import the new controller function
} from './application.controller.js';

const router = express.Router();

// ✅ Professional: Apply for a job
router.post('/', authMiddleware(['PRO']), applyToJob);

// ✅ Professional: Get only THEIR OWN applications (for the "My Bids" page)
// This matches the GET /applications call in your Applications.jsx
router.get('/', authMiddleware(['PRO']), getStudentApplications);

// ✅ MSME/Admin: View applications for a specific job
router.get('/job/:jobId', authMiddleware(['MSME', 'ADMIN']), getJobApplications);

// ✅ MSME/Admin: Accept/Reject an application
router.patch('/:id/status', authMiddleware(['MSME', 'ADMIN']), updateApplicationStatus);

export default router;
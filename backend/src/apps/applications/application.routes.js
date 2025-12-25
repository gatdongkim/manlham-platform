import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { 
    applyToJob, 
    getJobApplications, 
    updateApplicationStatus,
    getStudentApplications,
    withdrawApplication // ✅ Added import
} from './application.controller.js';

const router = express.Router();

router.post('/', authMiddleware(['PRO']), applyToJob);
router.get('/', authMiddleware(['PRO']), getStudentApplications);
router.get('/job/:jobId', authMiddleware(['MSME', 'ADMIN']), getJobApplications);
router.patch('/:id/status', authMiddleware(['MSME', 'ADMIN']), updateApplicationStatus);

// ✅ NEW: Professional withdraws their bid
router.delete('/:id', authMiddleware(['PRO']), withdrawApplication);

export default router;
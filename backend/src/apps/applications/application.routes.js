import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { 
    applyToJob, 
    getJobApplications, 
    updateApplicationStatus 
} from './application.controller.js';

const router = express.Router();

router.post('/', authMiddleware(['PRO']), applyToJob);
router.get('/job/:jobId', authMiddleware(['MSME', 'ADMIN']), getJobApplications);
router.patch('/:id/status', authMiddleware(['MSME', 'ADMIN']), updateApplicationStatus);

export default router;
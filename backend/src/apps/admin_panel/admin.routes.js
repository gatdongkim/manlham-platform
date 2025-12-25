import express from 'express';
import { authMiddleware, adminMiddleware } from '../../middlewares/auth.middleware.js';
import { 
    users, 
    getStats, 
    vetProfessional, 
    getVerificationQueue,
    getAllDisputes,
    resolveDispute,
    getAuditLogs
} from './admin.controller.js';

const router = express.Router();

/**
 * ✅ ACCESS CONTROL
 * Using both authMiddleware and adminMiddleware ensures double-layer security.
 */
router.use(authMiddleware());
router.use(adminMiddleware); 

// User Management (Identity Page)
// URL: /api/v1/admin/users
router.get('/users', users);

// Platform Overview (Control Panel Stats)
// URL: /api/v1/admin/stats
router.get('/stats', getStats);

// Audit & Logs
router.get('/audit-logs', getAuditLogs);

// Professional Vetting
router.get('/verification-queue', getVerificationQueue);
router.patch('/vet-professional/:id', vetProfessional);

// Escrow Dispute Resolution
router.get('/disputes', getAllDisputes);
router.post('/disputes/:jobId/resolve', resolveDispute);

export default router;
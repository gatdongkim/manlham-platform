import express from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { 
    users, 
    getStats, 
    vetProfessional, 
    getVerificationQueue,
    getAllDisputes,
    resolveDispute,
    getAuditLogs
} from './admin.controller.js'; // Added .js extension

const router = express.Router();

/**
 * ✅ ACCESS CONTROL
 * Protect all admin routes. Only users with 'ADMIN' role in their JWT can pass.
 */
router.use(authMiddleware(['ADMIN']));

// User Management
router.get('/users', users);

// Platform Overview
router.get('/stats', getStats);
router.get('/audit-logs', getAuditLogs);

// Professional Vetting (For South Sudan & Kenya regional verification)
router.get('/verification-queue', getVerificationQueue);
router.patch('/vet-professional/:id', vetProfessional);

// Escrow Dispute Resolution
router.get('/disputes', getAllDisputes);
router.post('/disputes/:jobId/resolve', resolveDispute);

// ✅ FIX: Use 'export default' for ESM compatibility
export default router;
import express from 'express';
import multer from 'multer';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { 
    create, 
    list, 
    hireStudent, 
    submitWork, 
    approveAndRelease,
    getMyJobs,
    getClientStats,
    adminApproveJob 
} from './job.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/deliverables/' });

// --- 1. SHARED & PUBLIC ROUTES ---
router.get("/", list); // List all open jobs for students
router.get("/client-stats", authMiddleware(["MSME", "ADMIN"]), getClientStats);

// --- 2. ADMIN ONLY ROUTES ---
// This matches the API.patch() call in your AdminDashboard.jsx
router.patch("/:jobId/approve", authMiddleware(["ADMIN"]), adminApproveJob);

// --- 3. CLIENT (MSME) ROUTES ---
router.post("/", authMiddleware(["MSME", "ADMIN"]), create);
router.get("/my-jobs", authMiddleware(["MSME"]), getMyJobs);
router.post("/hire", authMiddleware(["MSME", "ADMIN"]), hireStudent);

// We change this to a unique path so it doesn't conflict with the Admin approval
router.post('/:jobId/release-funds', authMiddleware(["MSME"]), approveAndRelease);

// --- 4. STUDENT (PRO) ROUTES ---
router.post('/:jobId/submit', authMiddleware(["PRO"]), upload.single('deliverable'), submitWork);

export default router;
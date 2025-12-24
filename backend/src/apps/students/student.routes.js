import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { 
    getDashboardSummary, 
    updateProfile, 
    getProfile 
} from './student.controller.js';

const router = express.Router();
const uploadDir = 'uploads/verification/';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const userId = req.user ? req.user.id : 'unknown';
        cb(null, `vetting-${userId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.use(authMiddleware(['PRO', 'ADMIN'])); 

router.get('/me', getProfile);
router.get('/dashboard-summary', getDashboardSummary);
router.put('/profile', upload.single('verificationDoc'), updateProfile);

export default router;
import express from 'express';
import * as paymentController from './payment.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Public route for M-Pesa Callback
router.post('/callback', paymentController.handleMpesaCallback);

// Protected routes
router.use(authMiddleware(["PRO", "MSME", "ADMIN"])); 

router.post('/initiate', paymentController.create);
router.get('/my-history', paymentController.myPayments);
router.get('/invoice/:jobId', paymentController.downloadStatement);

export default router;
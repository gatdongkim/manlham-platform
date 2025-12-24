import express from 'express';
import * as authController from './auth.controller.js';

const router = express.Router();

// These endpoints combine with the prefix in server.js (/api/v1/auth)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/resend-verification', authController.resendVerification);

export default router;
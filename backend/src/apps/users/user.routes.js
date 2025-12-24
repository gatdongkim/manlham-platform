import express from 'express';
import * as userController from './user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// All user routes are protected
router.use(authMiddleware());

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user profile
 */
router.get('/me', userController.getMe);

/**
 * @route   PUT /api/v1/users/update
 * @desc    Update user details
 */
router.put('/update', userController.updateUser);

export default router;
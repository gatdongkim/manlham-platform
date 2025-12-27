import express from 'express';
import * as userController from './user.controller.js';
import { authMiddleware, adminMiddleware } from '../../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/v1/users
 * @desc    Get all users (Identity Page)
 */
router.get('/', authMiddleware(), adminMiddleware, userController.getAllUsers);

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user profile
 */
router.get('/me', authMiddleware(), userController.getMe);

/**
 * @route   PUT /api/v1/users/update
 * @desc    Update user details
 */
router.put('/update', authMiddleware(), userController.updateUser);

export default router;
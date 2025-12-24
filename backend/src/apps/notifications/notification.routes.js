const express = require('express');
const router = express.Router();
const { 
    getNotifications, 
    markAsRead, 
    markAllRead 
} = require('./notification.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

// All notification routes require login
router.use(authMiddleware(['PRO', 'MSME', 'ADMIN']));

router.get('/', getNotifications);
router.patch('/mark-all', markAllRead);
router.patch('/:id/read', markAsRead);

module.exports = router;
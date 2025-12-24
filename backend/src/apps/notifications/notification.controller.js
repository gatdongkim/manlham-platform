const Notification = require('./notification.model');
const notificationService = require('./notification.service');

// @desc    Get all notifications for logged-in user
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .sort('-createdAt')
            .limit(50);
            
        const unreadCount = await Notification.countDocuments({ 
            recipient: req.user.id, 
            isRead: false 
        });

        res.status(200).json({ 
            success: true, 
            unreadCount,
            data: notifications 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Mark specific notification as read
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, recipient: req.user.id },
            { isRead: true },
            { new: true }
        );
        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Mark all notifications as read
exports.markAllRead = async (req, res) => {
    try {
        await notificationService.markAllAsRead(req.user.id);
        res.status(200).json({ success: true, message: "All notifications marked as read" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
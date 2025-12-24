import Notification from './notification.model.js';

/**
 * @desc    Core function to create a notification
 */
export const createNotification = async (recipientId, data) => {
    try {
        return await Notification.create({
            recipient: recipientId,
            sender: data.sender || null,
            type: data.type,
            title: data.title,
            message: data.message,
            relatedId: data.relatedId
        });
        // Note: Socket.io logic would be triggered here
    } catch (error) {
        console.error("Notification Service Error:", error);
    }
};

/**
 * @desc    Mark all as read
 */
export const markAllAsRead = async (userId) => {
    return await Notification.updateMany(
        { recipient: userId, isRead: false },
        { isRead: true }
    );
};
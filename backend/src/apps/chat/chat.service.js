const Chat = require('./chat.model');

/**
 * @desc    Save a message to the database
 */
exports.sendMessage = async (messageData) => {
    const { sender, receiver, text } = messageData;
    
    if (!receiver || !text) {
        throw new Error("Receiver and message text are required");
    }

    return await Chat.create({
        sender,
        receiver,
        text
    });
};

/**
 * @desc    Get messages between two specific users
 */
exports.getMessages = async (userId, otherUserId) => {
    return await Chat.find({
        $or: [
            { sender: userId, receiver: otherUserId },
            { sender: otherUserId, receiver: userId }
        ]
    })
    .sort({ createdAt: 1 }) // Chronological order
    .limit(50); // Get last 50 messages
};
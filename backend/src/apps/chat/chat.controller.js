import Message from './message.model.js';

export const send = async (req, res) => {
    try {
        const { receiverId, content, jobId } = req.body;
        const newMessage = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content,
            job: jobId
        });
        res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const messages = async (req, res) => {
    try {
        const { userId } = req.params;
        const chatHistory = await Message.find({
            $or: [
                { sender: req.user.id, receiver: userId },
                { sender: userId, receiver: req.user.id }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json({ success: true, data: chatHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
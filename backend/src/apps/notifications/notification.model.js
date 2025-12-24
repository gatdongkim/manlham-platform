import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    recipient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    type: { 
        type: String, 
        enum: [
            'NEW_APPLICATION', 
            'PAYMENT_RECEIVED', 
            'MESSAGE', 
            'JOB_ACCEPTED', 
            'VETTING_APPROVED',
            'HIRED',            // Added to support the hireStudent logic we built earlier
            'WORK_SUBMITTED',    // Added to support the submitWork logic
            'PAYMENT_RELEASED'   // Added to support the approveAndRelease logic
        ],
        required: true 
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedId: { type: mongoose.Schema.Types.ObjectId }, // ID of Job, Application, or Chat
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

// ✅ Use "export default" for ESM compatibility
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
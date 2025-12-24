const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    action: { 
        type: String, 
        required: true,
        enum: [
            'APPROVE_PRO', 
            'REJECT_PRO', 
            'RELEASE_FUNDS', 
            'REFUND_CLIENT', 
            'DELETE_USER',
            'SYSTEM_CONFIG_CHANGE'
        ]
    },
    targetType: { 
        type: String, 
        required: true, 
        enum: ['Job', 'Professional', 'User'] 
    },
    targetId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    details: { 
        type: String // e.g., "Released KES 15,000 for Job ID 123"
    },
    ipAddress: { type: String },
    userAgent: { type: String }
}, { timestamps: true });

// Index for fast searching by admin or action date
auditLogSchema.index({ admin: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
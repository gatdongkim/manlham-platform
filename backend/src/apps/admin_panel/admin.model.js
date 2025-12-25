import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { 
        type: String, 
        required: true,
        enum: ['APPROVE_PRO', 'REJECT_PRO', 'RELEASE_FUNDS', 'REFUND_CLIENT', 'DELETE_USER', 'SYSTEM_CONFIG_CHANGE']
    },
    targetType: { type: String, required: true, enum: ['Job', 'Professional', 'User'] },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    details: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String }
}, { timestamps: true });

auditLogSchema.index({ admin: 1, createdAt: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export default AuditLog; // ✅ ESM Export
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    job: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job', 
        required: true 
    },
    // Matches 'PRO' role users (Students)
    professional: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    proposal: { 
        type: String, 
        required: true 
    },
    bidAmount: { 
        type: Number, 
        required: true 
    },
    estimatedDays: { 
        type: Number 
    }, // Essential for MSME project planning
    status: { 
        type: String, 
        enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'], 
        default: 'PENDING' 
    }
}, { timestamps: true });

// ✅ Prevent duplicate applications: One student cannot apply for the same job twice
applicationSchema.index({ job: 1, professional: 1 }, { unique: true });

// ✅ Use ESM "export default" to fix the "ERR_MODULE_NOT_FOUND" error
const Application = mongoose.model('Application', applicationSchema);
export default Application;
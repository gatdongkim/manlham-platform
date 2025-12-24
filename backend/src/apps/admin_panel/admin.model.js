const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    platformFeePercentage: { 
        type: Number, 
        default: 10 
    },
    maintenanceMode: { 
        type: Boolean, 
        default: false 
    },
    updatedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, { timestamps: true });

module.exports = mongoose.model('AdminSettings', adminSchema);
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    subject: { 
        type: String, 
        required: true,
        trim: true 
    },
    category: {
        type: String,
        enum: ['PAYMENT', 'VETTING', 'TECHNICAL', 'DISPUTE', 'OTHER'],
        default: 'TECHNICAL'
    },
    description: { 
        type: String, 
        required: true 
    },
    relatedJob: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job' 
    },
    status: { 
        type: String, 
        enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'], 
        default: 'OPEN' 
    },
    priority: { 
        type: String, 
        enum: ['LOW', 'MEDIUM', 'HIGH'], 
        default: 'MEDIUM' 
    },
    attachments: [{ type: String }] // URLs to screenshots/documents
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
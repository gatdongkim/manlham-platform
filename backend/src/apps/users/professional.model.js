const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    skills: [{ type: String }],
    bio: { type: String },
    portfolioLinks: [{ type: String }],
    experienceYears: { type: Number },
    
    // --- Vetting System ---
    isVetted: { type: Boolean, default: false },
    verificationDocs: { type: String }, 
    rating: { type: Number, default: 0 },
    completedProjects: { type: Number, default: 0 },

    // ✅ NEW: Tracking which MSMEs have saved/bookmarked this profile
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Professional', professionalSchema);
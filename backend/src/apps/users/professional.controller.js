const Professional = require('./professional.model');

/**
 * @desc    Get all professionals with filtering
 * @route   GET /api/v1/professionals
 */
exports.getAllProfessionalProfiles = async (req, res) => {
    try {
        const { skill, vetted } = req.query;
        let query = {};

        // Filter by vetting status if requested
        if (vetted === 'true') query.isVetted = true;
        
        // Filter by skill (case-insensitive search)
        if (skill) query.skills = { $regex: skill, $options: 'i' };

        const pros = await Professional.find(query)
            .populate('user', 'name email')
            .sort('-rating');

        res.status(200).json({
            success: true,
            count: pros.length,
            data: pros
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Toggle Save/Unsave a professional profile
 * @route   PATCH /api/v1/professionals/:id/save
 */
exports.toggleSaveProfessional = async (req, res) => {
    try {
        const pro = await Professional.findById(req.params.id);
        if (!pro) return res.status(404).json({ message: "Professional not found" });

        const isSaved = pro.savedBy.includes(req.user.id);

        if (isSaved) {
            // Unsave
            pro.savedBy.pull(req.user.id);
        } else {
            // Save
            pro.savedBy.push(req.user.id);
        }

        await pro.save();
        res.status(200).json({
            success: true,
            message: isSaved ? "Removed from saved" : "Professional saved successfully",
            isSaved: !isSaved
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
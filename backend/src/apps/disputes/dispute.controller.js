const Job = require('../../jobs/job.model');

exports.initiateDispute = async (req, res) => {
    const { jobId, reason } = req.body;

    try {
        const job = await Job.findById(jobId);

        // Ensure only the involved client or student can dispute
        if (job.client.toString() !== req.user.id && job.student.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        job.status = 'DISPUTED';
        job.disputeReason = reason;
        await job.save();

        // Notify Admin (Implement your email/notification service here)
        res.status(200).json({ message: "Dispute raised. An admin will review the case.", job });
    } catch (error) {
        res.status(500).json({ message: "Failed to raise dispute" });
    }
};
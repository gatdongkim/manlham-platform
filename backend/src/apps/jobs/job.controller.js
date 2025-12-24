import Job from './job.model.js';
import mongoose from 'mongoose';
import * as notificationService from '../notifications/notification.service.js';

/**
 * @desc    Create a new job
 */
export const create = async (req, res) => {
    try {
        const jobData = {
            ...req.body,
            client: req.user.id, 
            status: 'OPEN',
            region: req.body.region || 'SS',
            currency: req.body.region === 'KE' ? 'KES' : 'SSP'
        };
        const job = await Job.create(jobData);
        res.status(201).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get Job by ID
 */
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('client', 'name email')
            .populate('professional', 'name email');
        
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc    Trigger Escrow Payment & Hire
 */
export const hireStudent = async (req, res) => {
    try {
        const { jobId, phoneNumber, region } = req.body;
        const job = await Job.findById(jobId);

        if (!job) return res.status(404).json({ message: "Job not found" });

        if (region === 'KE') {
            console.log(`Initiating Safaricom STK Push for ${phoneNumber}`);
        } else {
            console.log(`Initiating South Sudan Gateway (m-Gurush) for ${phoneNumber}`);
        }

        job.paymentStatus = 'PENDING_STK';
        job.checkoutRequestId = `REQ-${Date.now()}`;
        await job.save();

        res.status(200).json({ 
            success: true, 
            message: `Payment initiated via ${region === 'KE' ? 'M-Pesa' : 'South Sudan Gateway'}` 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Student submits work deliverable
 */
export const submitWork = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);

        if (!job) return res.status(404).json({ message: "Job not found" });
        
        if (job.professional?.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized. You are not assigned to this job." });
        }

        job.status = 'UNDER_REVIEW';
        job.deliverableUrl = req.file ? `/uploads/deliverables/${req.file.filename}` : req.body.link;
        job.submittedAt = new Date();
        await job.save();

        await notificationService.createNotification(job.client, {
            type: 'WORK_SUBMITTED',
            title: 'Work Submitted!',
            message: `The professional has submitted work for "${job.title}". Please review it.`,
            relatedId: job._id
        });

        res.status(200).json({ success: true, message: "Work submitted for review." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Approve work and release Escrow
 */
export const approveAndRelease = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);

        if (!job) return res.status(404).json({ message: "Job not found" });
        if (job.client.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized." });
        }

        job.status = 'COMPLETED';
        job.paymentStatus = 'RELEASED';
        job.completedAt = new Date();
        await job.save();

        if (job.professional) {
            await notificationService.createNotification(job.professional, {
                type: 'PAYMENT_RELEASED',
                title: 'Funds Received!',
                message: `Your payment for "${job.title}" has been released to your wallet.`,
                relatedId: job._id
            });
        }

        res.status(200).json({ success: true, message: "Funds released to professional." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get jobs posted by the logged-in client
 */
export const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ client: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching your jobs" });
    }
};

/**
 * @desc    List all OPEN jobs
 */
export const list = async (req, res) => {
    try {
        const jobs = await Job.find({ status: 'OPEN' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get Stats for Client Dashboard (FIX FOR FRONTEND CRASH)
 */
export const getClientStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const activeJobs = await Job.countDocuments({ client: userId, status: 'IN_PROGRESS' });
        const pendingBids = await Job.countDocuments({ client: userId, status: 'OPEN' });
        const completedJobs = await Job.countDocuments({ client: userId, status: 'COMPLETED' });

        res.status(200).json({
            activeJobs,
            pendingBids,
            completedJobs,
            totalSpent: 0
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching dashboard stats" });
    }
};

/**
 * @desc    Admin manually approves a job posting (Initial Approval)
 */
export const adminApproveJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Find the job and update both status and payment status
        const job = await Job.findByIdAndUpdate(
            jobId,
            { 
                status: 'OPEN', 
                paymentStatus: 'PAID' // This removes the 'UNPAID' badge in your UI
            },
            { new: true }
        );

        if (!job) return res.status(404).json({ success: false, message: "Job not found" });

        res.status(200).json({ 
            success: true, 
            message: "Job approved by Admin successfully", 
            data: job 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
import Application from './application.model.js';
import Job from '../jobs/job.model.js';

/**
 * @desc Create a new job application
 */
export const createApplication = async (userId, data) => {
    const existingApplication = await Application.findOne({ 
        job: data.job, 
        professional: userId 
    });

    if (existingApplication) {
        throw new Error("You have already applied for this job.");
    }

    const application = await Application.create({
        ...data,
        professional: userId 
    });

    return application;
};

/**
 * @desc Get all applications submitted by a specific professional
 * ✅ Added this for the "My Bids" functionality
 */
export const getApplicationsByProfessional = async (professionalId) => {
    return await Application.find({ professional: professionalId })
        .populate('job', 'title budget status') // Retrieves job details from Job collection
        .sort({ createdAt: -1 });
};

/**
 * @desc Get all applications for a specific job (For MSMEs)
 */
export const getApplicationsByJob = async (jobId) => {
    return await Application.find({ job: jobId })
        .populate('professional', 'name email phoneNumber')
        .sort({ createdAt: -1 });
};

/**
 * @desc Find a single application by ID
 */
export const getApplicationById = async (id) => {
    const application = await Application.findById(id);
    if (!application) {
        throw new Error("Application not found.");
    }
    return application;
};

/**
 * @desc Update status (ACCEPTED/REJECTED)
 */
export const updateApplicationStatus = async (id, status) => {
    const application = await Application.findByIdAndUpdate(
        id, 
        { status }, 
        { new: true, runValidators: true }
    );

    if (!application) {
        throw new Error("Application not found.");
    }

    if (status === 'ACCEPTED') {
        await Job.findByIdAndUpdate(application.job, { status: 'CLOSED' });
    }

    return application;
};
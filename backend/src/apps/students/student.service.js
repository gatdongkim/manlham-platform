import Student from "./student.model.js";
import Job from "../jobs/Job.model.js";
import Application from "../applications/application.model.js";

export const createStudentProfile = (data) => Student.create(data);

export const getStudentProfile = (userId) => Student.findOne({ user: userId });

export const updateStudentProfile = (userId, data) => 
  Student.findOneAndUpdate({ user: userId }, { $set: data }, { new: true, upsert: true });

export const getDashboardData = async (userId) => {
  // 1. Fetch recent applications
  const applications = await Application.find({ student: userId })
    .populate('job', 'title')
    .sort({ createdAt: -1 })
    .limit(5);

  // 2. Count active jobs where the student is assigned
  const activeCount = await Job.countDocuments({ 
    student: userId, 
    status: 'IN_PROGRESS' 
  });

  // 3. Calculate total earnings (jobs marked as released to student)
  const completedJobs = await Job.find({ 
    student: userId, 
    paymentStatus: 'RELEASED_TO_STUDENT' 
  });
  
  const totalEarned = completedJobs.reduce((sum, job) => sum + job.budget, 0);

  return { applications, stats: { active: activeCount, earned: totalEarned } };
};
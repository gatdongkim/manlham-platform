const User = require('../users/user.model'); // Adjust paths based on your folder structure
const Job = require('../jobs/job.model');

exports.getAllUsers = async () => {
  return await User.find().select('-password').sort({ createdAt: -1 });
};

exports.getPlatformStats = async () => {
  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();
  const activeEscrows = await Job.countDocuments({ status: 'IN_PROGRESS' });
  
  return {
    users: userCount,
    jobs: jobCount,
    activeEscrows: activeEscrows
  };
};
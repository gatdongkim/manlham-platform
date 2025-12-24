import http from "./http";
import { postJob } from "../../api/jobs";
/* ======================
   JOB SERVICES
====================== */

/**
 * Fetch all available jobs with optional filters
 * @param {Object} params - { category, minBudget, search, page }
 */
export const getJobs = async (params = {}) => {
  const res = await http.get("/jobs", { params });
  return res.data;
};

/**
 * Fetch a single job's details and requirements
 */
export const getJobById = (id) => 
  http.get(`/jobs/${id}`);

/**
 * [CLIENT] Post a new job listing
 * @param {Object} data - Job details (title, description, budget, deadline)
 */
export const postJob = (data) => 
  http.post("/jobs", data);

/**
 * [CLIENT] Fetch jobs posted by the logged-in client
 */
export const getMyPostedJobs = () => 
  http.get("/jobs/my-postings");

/**
 * [STUDENT] Apply for a specific job
 * @param {string} jobId 
 * @param {Object} data - { proposalText, bidAmount }
 */
export const applyToJob = (jobId, data) => 
  http.post(`/jobs/${jobId}/apply`, data);

/**
 * [STUDENT] Fetch applications sent by the logged-in student
 */
export const getMyApplications = () => 
  http.get("/jobs/my-applications");

/**
 * [CLIENT] Update job status (e.g., mark as 'In Progress' or 'Completed')
 */
export const updateJobStatus = (jobId, status) => 
  http.patch(`/jobs/${jobId}/status`, { status });
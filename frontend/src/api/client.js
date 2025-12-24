import http from "./http";

/* ======================
   CLIENT SERVICES
====================== */

/**
 * [CREATE] Post a new project to the marketplace
 * @param {Object} data - { title, description, budget, category, deadline }
 */
export const postJob = (data) =>
  http.post("/client/jobs", data);

/**
 * [READ] Fetch all jobs posted by the currently logged-in client
 */
export const fetchMyJobs = () =>
  http.get("/client/jobs");

/**
 * [READ] Browse the marketplace talent pool (Students)
 * Supports query params like ?skill=React or ?institution=University
 */
export const fetchStudents = (params) =>
  http.get("/client/students", { params });

/**
 * [READ] Get a deep-dive into a specific student's profile
 */
export const fetchStudentProfile = (studentId) =>
  http.get(`/client/students/${studentId}`);

/**
 * [ACTION] Hire a student for a specific project
 * This typically triggers the Escrow creation process
 */
export const hireStudent = (jobId, studentId) =>
  http.post(`/client/jobs/${jobId}/hire`, { studentId });

/**
 * [READ] Fetch all financial transactions/payments for this client
 */
export const fetchPayments = () =>
  http.get("/client/payments");

/**
 * [UPDATE] Approve a student's submission and close the job
 */
export const approveWork = (jobId) =>
  http.patch(`/client/jobs/${jobId}/approve`);
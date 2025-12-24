import http from "./http";

/* ======================
   STUDENT SERVICES
====================== */

/**
 * [READ] Fetch personalized job recommendations and trending skills
 * This powers the main feed on the student dashboard.
 */
export const fetchDiscover = () =>
  http.get("/student/discover");

/**
 * [READ] Fetch fellow students or mentors for collaboration
 * Great for building the "Nexus" community feel.
 */
export const fetchMyNetwork = () =>
  http.get("/student/network");

/**
 * [UPDATE] Modify profile details, skills, or education
 * @param {Object} data - { bio, skills, institution, profileImage }
 */
export const updateStudentProfile = (data) =>
  http.patch("/student/profile", data);

/**
 * [CREATE] Report an issue or ask for help
 * @param {Object} ticketData - { subject, message, priority }
 */
export const submitSupportTicket = (ticketData) =>
  http.post("/student/support", ticketData);

/**
 * [READ] Check status of existing support tickets
 */
export const fetchSupportTickets = () =>
  http.get("/student/support/my-tickets");

/**
 * [READ] Fetch student's specific statistics (Jobs completed, total earned)
 */
export const fetchStudentStats = () =>
  http.get("/student/stats");
import http from "./http";

/* ======================
   CHAT & MESSAGING SERVICES
====================== */

/**
 * Fetch a list of all active chat threads for the logged-in user.
 * Each conversation includes the last message and participant details.
 */
export const fetchConversations = () =>
  http.get("/chat/conversations");

/**
 * Fetch full message history for a specific conversation.
 * @param {string} conversationId 
 */
export const fetchMessages = (conversationId) =>
  http.get(`/chat/${conversationId}/messages`);

/**
 * Send a new message within a conversation.
 * @param {string} conversationId 
 * @param {string} text - The content of the message
 */
export const sendMessage = (conversationId, text) =>
  http.post(`/chat/${conversationId}/messages`, { text });

/**
 * Create or open a chat with a specific user.
 * Useful when a Client clicks "Message" on a Student's proposal.
 * @param {string} receiverId - The ID of the student or client
 */
export const startConversation = (receiverId) =>
  http.post("/chat/initiate", { receiverId });

/**
 * Mark all messages in a conversation as read.
 */
export const markAsRead = (conversationId) =>
  http.patch(`/chat/${conversationId}/read`);
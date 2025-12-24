import http from "./http"; // This points to your Axios instance

/* ======================
   AUTHENTICATION SERVICES
====================== */

/**
 * Sends credentials to backend and initializes local session
 * @param {Object} credentials - { email, password }
 */
export const login = async (credentials) => {
  try {
    const res = await http.post("/auth/login", credentials);
    
    // Check if token exists in response
    if (res.data?.token) {
      // Use the keys consistent with our AuthContext recovery logic
      localStorage.setItem("manlhamtechsupport_token", res.data.token);
      localStorage.setItem("manlhamtechsupport_user", JSON.stringify(res.data.user));
    }
    
    return res.data;
  } catch (error) {
    // Throw error to be caught by the UI component's catch block
    throw error.response?.data || { message: "Network connection failed" };
  }
};

/**
 * Register a new Student
 */
export const registerStudent = (data) => 
  http.post("/auth/register/student", data);

/**
 * Register a new Client
 */
export const registerClient = (data) => 
  http.post("/auth/register/client", data);

/**
 * Clear local session
 */
export const logout = () => {
  localStorage.removeItem("manlhamtechsupport_token");
  localStorage.removeItem("manlhamtechsupport_user");
  // Optional: Notify backend to blacklist token
  return http.post("/auth/logout").catch(() => {}); 
};

/**
 * Fetch fresh user data using the stored token
 */
export const getProfile = async () => {
  const res = await http.get("/auth/me");
  return res.data;
};
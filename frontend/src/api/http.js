import axios from "axios";

/**
 * Global Axios Instance
 * Configured for the South Sudan Manlham Tech Support (SkillLink) Backend
 */
const http = axios.create({
  // ✅ Prioritizes Environment Variables, falls back to local port 5000
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Request Interceptor: Attach the JWT token automatically
http.interceptors.request.use(
  (config) => {
    // ✅ Ensure this key matches exactly what you use in AuthContext.jsx
    const token = localStorage.getItem("skilllink_token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Global Error & Session Handling
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ Handle Network Errors (Server Offline)
    if (!error.response) {
      console.error("Network Error: Please check if your backend server is running on Port 5000");
    }

    // ✅ 401 Unauthorized: Session Expired or Invalid Token
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("skilllink_token");
      localStorage.removeItem("skilllink_user");
      
      // Prevent infinite redirect loops if already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = "/login?session=expired";
      }
    }

    // ✅ Always reject with the error so the frontend 'catch' block can see it
    return Promise.reject(error);
  }
);

export default http;
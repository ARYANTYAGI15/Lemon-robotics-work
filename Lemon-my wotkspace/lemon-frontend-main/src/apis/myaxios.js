// src/myaxios.js
import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Your API base URL
  timeout: 1000, // Optional: set a timeout for requests
});

// Function to retrieve tokens from localStorage
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Function to set tokens in localStorage
const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// Function to remove tokens from localStorage
const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Function to refresh access token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    removeTokens(); // No refresh token, clear storage
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
      refresh: refreshToken,
    });
    const { access } = response.data;
    setTokens(access, refreshToken); // Store new access token
    return access; // Return new access token
  } catch (error) {
    removeTokens(); // On error, clear tokens
    throw new Error("Failed to refresh access token");
  }
};

// Add an interceptor for requests
api.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor for responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is a 401 Unauthorized, attempt to refresh token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried
      try {
        const newAccessToken = await refreshAccessToken(); // Refresh token
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        // Handle error refreshing token
        console.error(refreshError);
        removeTokens(); // Clear tokens on failure
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Export the api and token functions
export { api, setTokens, removeTokens };

import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/hr/",  // Your API base URL
  timeout: 5000,  // Optional: set a timeout for requests (in milliseconds)
});

// Add a request interceptor to include the access token in the request headers
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh when a 401 Unauthorized occurs
api.interceptors.response.use(
  (response) => response,  // If the response is successful, just return it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token (401 Unauthorized)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Mark the request as retried

      // Get the refresh token from localStorage
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          // Send a request to refresh the access token
          const response = await axios.post("http://127.0.0.1:8000/auth/jwt/refresh/", {
            refresh: refreshToken,
          });

          // Store the new access token in localStorage
          const newAccessToken = response.data.access;
          localStorage.setItem("access_token", newAccessToken);

          // Update the original request's authorization header and retry the request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Unable to refresh access token:", refreshError);
          // Optionally, redirect to login or logout the user
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    // If the error is not due to token expiration or refresh fails, just reject it
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios"; // Importing axios
import api from "./myaxios"; // Adjusted path if myaxios.js is one level up

// Set base URL for the axios instance
api.defaults.baseURL = "http://127.0.0.1:8000/hr/"; // Adjust based on your environment

// Function to handle user login requests
export async function userlogin(email, password) {
  try {
    const response = await api.post("auth/jwt/create/", {
      username: email,
      password: password,
    });
    localStorage.clear();

    // Store tokens in local storage
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    // Set the Authorization header for future requests
    setAuthToken(response.data.access);

    // Redirect to the homepage or dashboard after login
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    alert("Username / Password incorrect or mismatch!");
  }
}

// Helper function to set the Authorization token
export function setAuthToken(token) {
  if (token) {
    // Set the default authorization header with the access token
    axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    // Remove auth header if there's no token
    delete axios.defaults.headers.common["Authorization"];
  }
}

// Function to refresh the access token
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken) {
    try {
      const response = await api.post("auth/jwt/refresh/", {
        refresh: refreshToken,
      });

      // Update the access token
      const newAccessToken = response.data.access;
      localStorage.setItem("access_token", newAccessToken);
      setAuthToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token", error);
      logoutUser(); // Optional: Logout if refresh fails
    }
  }
}

// Function to handle automatic token refreshing
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If access token expired (status 401), try to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      // Retry the original request with the new access token
      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `JWT ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

// Function to log out the user and clear tokens
export function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  setAuthToken(null);
  window.location.href = "/login";
}

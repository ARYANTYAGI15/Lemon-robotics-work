// src/myaxios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Your API base URL
  timeout: 1000, // Optional: set a timeout for requests
});

// Optional: Add an interceptor for requests
api.interceptors.request.use(
  (config) => {
    // Add authorization token if necessary
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add an interceptor for responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
